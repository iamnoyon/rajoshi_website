"use client";

import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

const FormFileUpload = ({
  name,
  label,
  required = false,
  multiple = false,
  accept = "*",

  wrapperClass = "",
  labelClass = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const inputRef = useRef(null);

  return (
    <div className={`w-full ${wrapperClass}`}>
      {label && (
        <label
          className={`mb-2 block text-sm font-medium text-gray-800 ${labelClass}`}
        >
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? `${label || name} is required`
            : false,
        }}
        defaultValue={multiple ? [] : null}
        render={({ field }) => {
          const fileList = multiple
            ? field.value || []
            : field.value
            ? [field.value]
            : [];

          const handleFiles = (files) => {
            const selectedFiles = Array.from(files);

            field.onChange(
              multiple
                ? selectedFiles
                : selectedFiles[0] || null
            );
          };

          const removeFile = (index) => {
            if (!multiple) {
              field.onChange(null);
              return;
            }

            const updatedFiles = [...fileList];
            updatedFiles.splice(index, 1);

            field.onChange(updatedFiles);
          };

          return (
            <>
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className={`
                  cursor-pointer rounded-xl border-2 border-dashed
                  p-8 text-center transition-all
                  hover:border-blue-500 hover:bg-gray-50
                  ${
                    errors[name]
                      ? "border-red-500"
                      : "border-gray-300"
                  }
                `}
              >
                <FiUploadCloud
                  size={40}
                  className="mx-auto mb-3 text-gray-400"
                />

                <p className="font-medium text-gray-700">
                  Click to upload or drag files here
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Allowed: {accept}
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  multiple={multiple}
                  accept={accept}
                  onChange={(e) =>
                    handleFiles(e.target.files)
                  }
                />
              </div>

              {fileList.length > 0 && (
                <div className="mt-4 space-y-2">
                  {fileList.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FiFile className="text-gray-500" />

                        <div>
                          <p className="text-sm font-medium">
                            {file.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX size={18} className="hover:cursor-pointer"/>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors[name] && (
                <p className="mt-2 text-sm text-red-500">
                  {errors[name]?.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default FormFileUpload;