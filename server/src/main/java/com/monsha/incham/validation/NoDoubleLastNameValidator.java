package com.monsha.incham.validation;

import com.monsha.incham.annotation.NoDoubleLastName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NoDoubleLastNameValidator implements ConstraintValidator<NoDoubleLastName, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return true;
        return !(value.contains(" ") || value.contains("-"));
    }
}
