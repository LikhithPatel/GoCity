package com.likhith.gocity.exception;

public class ApiException extends RuntimeException{
    public ApiException(String message) {
        super(message);
    }
}
