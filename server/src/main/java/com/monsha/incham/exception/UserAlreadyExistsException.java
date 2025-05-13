package com.monsha.incham.exception;

public class UserAlreadyExistsException extends RuntimeException {
  
  public UserAlreadyExistsException(String message) {
    super(message);
  }
}