# Biltern

## Bilkent CS-319 project of group Caffé

  Biltern is a web application aimed to facilitate the internship report processing for Summer Training(XX299-XX399) courses in the Engineering Faculty of Bilkent University.

## Team Members

- Enes Bektaş
- Arshia Bakhshayesh
- Faaiz Khan
- Cenk Merih Olcay
- Faruk Uçgun
	
# Roles and their Features

## Undergraduate: 
- Upload and re-upload reports
- View feedback from the grader

## Teaching Assistant: 
- Does the first formatting check of a submission before a faculty member
- Can provide feedback to the student and ask for a resubmission 

## Faculty Member (Grader): 
- Is assigned an allocation of undergraduate students
- Oversees the progress of the student
- Can request resubmission of the student’s internship grading from the company
- Can provide feedback to the student; outlining what to change 
- Grades the written summer training report
- Inputs and submits the grades onto the system
- Can assign grades to the students

## Summer Training Department Coordinators - Dean: 
- Ability to assign new faculty members as graders
- View statistics of the reports, students, and graders

## BCC Admin: 
- Assigns secretary role

## Secretary (super user):   
- Initializes coordinators
- Creates and provides student list 
- Assigns students to faculty members 
- Can reassign faculty members if needed

# Common Features
- Authentication process of different roles is done through the university email
- Each role can manage their password
- Everyone with a Bilkent email has the ability to make and manage an account but only specified accounts with tasks or roles assigned to them will be able to perform actions
- Validation of profile and course reports
- Provide report feedback from graders
- Automatic format checking system to reduce the work of the grader and provide automatic feedback to the students
- Notify and alert users about updates such as submission of a new grade and submission deadlines through email
- Check the status of reports that the role has access to





