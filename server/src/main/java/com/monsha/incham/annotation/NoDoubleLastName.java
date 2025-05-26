package com.monsha.incham.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.monsha.incham.validation.NoDoubleLastNameValidator;

@Documented
@Constraint(validatedBy = NoDoubleLastNameValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NoDoubleLastName {
    String message() default "Двойные фамилии запрещены";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}