package Caffe.BilternServer;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jmo
 * @date 6.05.2023
 */

@ControllerAdvice
public class RequestValidationHandler extends ResponseEntityExceptionHandler {


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errorMessages = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(
                (e) -> {
                    errorMessages.put(((FieldError)e).getField(), e.getDefaultMessage());
                }
                );

        return ResponseEntity.badRequest().body(errorMessages);
    }
}
