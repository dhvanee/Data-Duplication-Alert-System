import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Label } from '../../components/ui/label';

const Form = FormProvider;

const FormField = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl {...field} {...props} />
        </FormItem>
      )}
      {...props}
    />
  );
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error } = useFormFieldContext();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error } = useFormFieldContext();

  return (
    <div
      ref={ref}
      className={cn("mt-1", error && "has-error")}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = useFormFieldContext();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// Create a form field context to track error state
const FormFieldContext = React.createContext({ id: "" });

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    id: `${fieldContext.id}-form-item`,
    name: fieldContext.name,
    ...itemContext,
  };
}

// Create a form item context to track form state
const FormItemContext = React.createContext({ id: "" });

function useFormFieldContext() {
  const fieldContext = React.useContext(FormFieldContext);
  
  if (!fieldContext) {
    throw new Error("useFormFieldContext should be used within <FormField>");
  }
  
  const { getFieldState } = useFormContext();
  
  const fieldState = getFieldState(fieldContext.name);
  
  return {
    id: fieldContext.id,
    name: fieldContext.name,
    ...fieldState,
  };
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormField,
};