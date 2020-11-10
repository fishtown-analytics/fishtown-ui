import { useMemo } from 'react';
import { FieldError, FormState } from 'react-hook-form';

// Memoized and normalized error messages
export const useErrorMessages = (
  errors: Record<string, FieldError>,
  formState: FormState<any>
): Record<string, string | { submitCount: number; errorCount: number }> => {
  const keyCount = Object.keys(errors).length;
  return useMemo(() => {
    const messages = {
      _meta: {
        submitCount: formState.submitCount,
        errorCount: keyCount,
      },
    };
    return Object.keys(errors).reduce((messages, key) => {
      messages[key] = errors[key].message;
      return messages;
    }, messages);
  }, [errors, formState.submitCount, keyCount]);
};
