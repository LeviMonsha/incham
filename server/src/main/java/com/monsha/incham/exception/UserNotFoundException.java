package com.monsha.incham.exception;

public class UserNotFoundException extends RuntimeException {
  
  public UserNotFoundException(String message) {
    super(message);
  }
}