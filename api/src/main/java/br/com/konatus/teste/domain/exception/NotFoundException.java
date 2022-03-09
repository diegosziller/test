package br.com.konatus.teste.domain.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Class<?> clazz, long id) {
        super(String.format("%s com id %d não encontrado(a)", clazz.getSimpleName(), id));
    }
    
}
