package br.com.konatus.teste.configuration;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.konatus.teste.domain.exception.AlreadyExistsException;
import br.com.konatus.teste.domain.exception.NotFoundException;
import br.com.konatus.teste.domain.exception.StageException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(HttpServletRequest request, NotFoundException ex) {
        return returnBodyMessage(ex, request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<Object> handleAlreadyExistsException(HttpServletRequest request, AlreadyExistsException ex) {
        return returnBodyMessage(ex, request.getRequestURI(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(StageException.class)
    public ResponseEntity<Object> handleStageException(HttpServletRequest request, StageException ex) {
        return returnBodyMessage(ex, request.getRequestURI(), HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> returnBodyMessage(Exception ex, String path, HttpStatus status) {
        Map<String, String> bodyMap = new HashMap<>();
        bodyMap.put("message", ex.getMessage());
        bodyMap.put("path", path);
        return ResponseEntity.status(status).body(bodyMap);
      }

}
