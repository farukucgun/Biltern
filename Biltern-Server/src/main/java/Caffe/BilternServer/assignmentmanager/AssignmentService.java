package Caffe.BilternServer.assignmentmanager;


import Caffe.BilternServer.auth.BilternUserRole;
import Caffe.BilternServer.auth.BilternUserService;
import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.course.CourseRepository;
import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.report.ReportRepository;
import Caffe.BilternServer.roleadministration.UserRegisterationRequest;
import Caffe.BilternServer.users.*;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.management.InstanceAlreadyExistsException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AssignmentService {

    private ReportRepository reportRepository;
    private CourseRepository courseRepository;
    private StudentRepository studentRepository;
    private GraderRepository graderRepository;
    private TeachingAssistantRepository TARepository;
    private BilternUserService bilternUserService;



    @Autowired
    public AssignmentService(ReportRepository reportRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository,
                             GraderRepository graderRepository,
                             TeachingAssistantRepository TARepository,
                             BilternUserService bilternUserService) {
        this.reportRepository = reportRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.graderRepository = graderRepository;
        this.TARepository = TARepository;
        this.bilternUserService = bilternUserService;
    }


    @Transactional
    public void addStudentToCourse(Long studentId, String courseCode){

        Report report = new Report();
        Student student = (Student) studentRepository.findById(studentId).get();
        Course course = courseRepository.findByCourseCode(courseCode).orElse(new Course());
        course.setCourseCode(courseCode);

        report.setStudent(student);
        report.setCourse(course);
        report = reportRepository.save(report);

        List<Report> studentReports = student.getReports();
        List<Report> courseReports = course.getReports();
        if(studentReports == null){
            studentReports = new ArrayList<Report>();
        }
        if(courseReports == null){
            courseReports = new ArrayList<Report>();
        }

        studentReports.add(report);
        courseReports.add(report);

        courseRepository.save(course);
        studentRepository.save(student);
    }
    @Transactional
    public void addReportToGrader(Long studentId, String courseName, Long graderId){
        Report report = reportRepository.
                findReportByStudentBilkentIdAndCourse_CourseCode(studentId, courseName).get();
        Grader grader = graderRepository.findById(graderId).get();

        report.setGrader(grader);
        List<Report> graderReports = grader.getReports();
        if(graderReports == null){
            graderReports = new ArrayList<Report>();
        }
        graderReports.add(report);
        grader.getReports().add(report);

        reportRepository.save(report);
        graderRepository.save(grader);
    }

    @Transactional
    public void addReportToTeachingAssistant(Long studentId, String courseName, Long TAId) {
        Report report = reportRepository.
                findReportByStudentBilkentIdAndCourse_CourseCode(studentId, courseName).get();
        TeachingAssistant TA = TARepository.findById(TAId).get();

        report.setTeachingAssistant(TA);
        List<Report> TAReports = TA.getReports();
        if(TAReports == null){
            TAReports = new ArrayList<Report>();
        }
        TAReports.add(report);

        reportRepository.save(report);
        TARepository.save(TA);
    }

    @Transactional
    public void parseExcelSheet(MultipartFile file) throws IOException, InstanceAlreadyExistsException {
        InputStream inputStream = file.getInputStream();

        Workbook workbook = new XSSFWorkbook(inputStream);

        int sheetCount = workbook.getNumberOfSheets();
        String[] keyWords = {"email", "department"};
        for(int i = 0; i < sheetCount; i++){
            Sheet sheet = workbook.getSheetAt(i);

            if(doesRowContainWords(sheet,0, keyWords)){
                initializeUsers(sheet);
            } else{
                assignUsers(sheet);
            }
        }

        workbook.close();
        inputStream.close();
    }

    public void initializeUsers(Sheet sheet) throws InstanceAlreadyExistsException {
        UserRegisterationRequest userRegisterationRequest = new UserRegisterationRequest();
        // Get the last row number
        int lastRowNum = sheet.getLastRowNum();
        int lastCellNum = 5;

        int columnTags[] = new int[5];
        String[] columnTagConsts = {"id", "email", "role", "name", "department"};

        boolean listDone;
        boolean validCell;
        for (int rowIndex = 0; rowIndex <= lastRowNum; rowIndex++) {
            Row row = sheet.getRow(rowIndex);
            listDone = false;
            validCell = true;
            for (int cellIndex = 0; cellIndex < lastCellNum; cellIndex++) {
                Cell cell = row.getCell(cellIndex);

                //skip empty cells
                if (cell == null || cell.getCellType() == CellType.BLANK) {
                    //end of the list stop iterating
                    if((rowIndex + 1 <= lastRowNum) &&
                            (sheet.getRow(rowIndex + 1).getCell(0).getCellType() == CellType.BLANK)){
                        listDone = true;
                        break;
                    }
                    validCell = false;
                    continue;
                }

                //define columns
                if(rowIndex == 0){
                    String columnTag = cell.getStringCellValue().toLowerCase().trim().replaceAll("\\s", "");
                    for (int i = 0; i < 5; i++){
                        if(columnTag.contains(columnTagConsts[i])) {
                            columnTags[i] = cellIndex;
                            break;
                        }
                    }
                    validCell = false;
                    continue;
                }

                if(cellIndex == columnTags[0]){
                    Long bilkentId = Long.valueOf((int)cell.getNumericCellValue());
                    userRegisterationRequest.setBilkentId(bilkentId);
                } else if (cellIndex == columnTags[1]) {
                    userRegisterationRequest.setEmail(cell.getStringCellValue());
                } else if (cellIndex == columnTags[2]) {
                    BilternUserRole bilternUserRole = BilternUserRole.UNDERGRADUATE;
                    String role = cell.getStringCellValue().toLowerCase().trim().replaceAll("\\s", "");

                    if (role.contains("grader") || role.contains("instructor") || role.contains("faculty")) {
                        bilternUserRole = BilternUserRole.FACULTY_MEMBER;
                    } else if (role.contains("ta") || role.contains("teachingassistant")) {
                        bilternUserRole = BilternUserRole.TEACHING_ASSISTANT;
                    } else if(role.contains("coordinator")){
                        bilternUserRole = BilternUserRole.DEPARTMENT_COORDINATOR;
                    }
                    userRegisterationRequest.setBilternUserRole(bilternUserRole);
                } else if (cellIndex == columnTags[3]) {
                    userRegisterationRequest.setUserName(cell.getStringCellValue());
                } else if (cellIndex == columnTags[4]) {
                    String departmentName = cell.getStringCellValue().trim().toLowerCase().replaceAll("\\s", "");
                    Department department = Department.CS;
                    if(departmentName.contains("eee") || departmentName.contains("electrical")){
                        department = Department.EEE;
                    } else if (departmentName.contains("ie") || departmentName.contains("industrial")) {
                        department = Department.IE;
                    } else if (departmentName.contains("me") || departmentName.contains("mechanical")) {
                        department = Department.ME;
                    }
                    userRegisterationRequest.setDepartment(department);
                }

            }
            if (validCell){
                userRegisterationRequest.setDean(false);
                bilternUserService.registerUser(userRegisterationRequest);
            }
            if(listDone){
                break;
            }
        }
    }

    public void assignUsers(Sheet sheet){
        int lastRowNum = sheet.getLastRowNum();
        int lastCellNum = 4;

        int columnTags[] = new int[lastCellNum];
        String[] columnTagConsts = {"student", "grader", "ta", "course"};

        boolean listDone;
        boolean validCell;
        for (int rowIndex = 0; rowIndex <= lastRowNum; rowIndex++) {
           Long studentId = Long.valueOf(-1);
           Long graderId = Long.valueOf(-1);
           Long TAId = Long.valueOf(-1);
           String courseCode = "NA";

            Row row = sheet.getRow(rowIndex);
            listDone = false;
            for (int cellIndex = 0; cellIndex < lastCellNum && row != null; cellIndex++) {
                Cell cell = row.getCell(cellIndex);

                //skip empty cells
                if (cell == null || cell.getCellType() == CellType.BLANK) {
                    //end of the list stop iterating
//                    if((rowIndex + 1 <= lastRowNum) &&
//                            (sheet.getRow(rowIndex + 1).getCell(0) == null)){
//                        listDone = true;
//                        break;
//                    }
                    continue;
                }

                //define columns
                if(rowIndex == 0){
                    String columnTag = cell.getStringCellValue().toLowerCase().trim().replaceAll("\\s", "");
                    for (int i = 0; i < lastCellNum; i++){
                        if(columnTag.contains(columnTagConsts[i])) {
                            columnTags[i] = cellIndex;
                            break;
                        }
                    }
                    continue;
                }

                if(cellIndex == columnTags[0]){
                    studentId = Long.valueOf((int) cell.getNumericCellValue());
                } else if (cellIndex == columnTags[1]) {
                    graderId = Long.valueOf((int) cell.getNumericCellValue());
                } else if (cellIndex == columnTags[2]) {
                    TAId = Long.valueOf((int) cell.getNumericCellValue());
                } else if (cellIndex == columnTags[3]) {
                    courseCode = cell.getStringCellValue().trim().replaceAll("\\s", "");;
                }
            }
            if (rowIndex != 0){
                if(studentId != Long.valueOf(-1)){
                    if(!courseCode.equals("NA")){
                        addStudentToCourse(studentId, courseCode);
                        if(graderId != Long.valueOf(-1)){
                            System.out.println("-----------what");
                            addReportToGrader(studentId, courseCode, graderId);
                        }
                        if(TAId != Long.valueOf(-1)){
                            addReportToTeachingAssistant(studentId, courseCode, graderId);
                        }
                    }
                }
            }
            if(listDone){
                break;
            }
        }
    }

    public static boolean doesRowContainWords(Sheet sheet, int rowNumber, String[] words) {
        Row row = sheet.getRow(rowNumber);
        if (row != null) {
            Set<String> wordSet = new HashSet<>();
            for (String word : words) {
                wordSet.add(word.toLowerCase()); // Add words to the HashSet in lowercase for case-insensitive comparison
            }
            for (Cell cell : row) {
                if (cell.getCellType() == CellType.STRING) {
                    String cellValue = cell.getStringCellValue();
                    if (cellValue != null) {
                        String lowercaseCellValue = cellValue.toLowerCase().trim()
                                .replaceAll("\\s", "");
                        for (String word : wordSet) {
                            if (lowercaseCellValue.contains(word)) {
                                return true; // At least one word found in the row
                            }
                        }
                    }
                }
            }
        }
        return false; // None of the words found in the row
    }
}


