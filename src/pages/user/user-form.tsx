//@ts-nocheck
import { useState, ChangeEvent } from "react";
import { Check, Camera, X, Loader2, User } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the form data interface
interface FormData {
  surname: string;
  firstName: string;
  middleName?: string;
  gender: string;
  age: string; // Changed to string to match default value
  maritalStatus: string;
  nationality: string;
  state: string;
  lga: string;
  ward?: string;
  nin: string;
  phoneNo: string;
  payment: string;
}

// Define select field options interface
interface FormFieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export default function UserForm() {
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [pictureError, setPictureError] = useState<string | null>(null);

  // Define schema with proper types
  const schema = yup.object({
    surname: yup.string().required("Surname is required"),
    firstName: yup.string().required("First name is required"),
    middleName: yup.string().optional(),
    gender: yup.string().required("Gender is required"),
    age: yup
      .string()
      .required("Age is required")
      .test(
        "is-valid-age",
        "Age must be a number between 18 and 120",
        (value) => {
          const numValue = parseInt(value, 10);
          return !isNaN(numValue) && numValue >= 18 && numValue <= 120;
        }
      ),
    maritalStatus: yup.string().required("Marital status is required"),
    nationality: yup.string().required("Nationality is required"),
    state: yup.string().required("State is required"),
    lga: yup.string().required("LGA is required"),
    ward: yup.string().optional(),
    nin: yup
      .string()
      .required("NIN is required")
      .matches(/^\d{11}$/, "NIN must be exactly 11 digits"),
    phoneNo: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    payment: yup.string().required("Payment method is required"),
  });

  // Initialize react-hook-form with proper types
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      surname: "",
      firstName: "",
      middleName: "",
      gender: "",
      age: "",
      maritalStatus: "",
      nationality: "",
      state: "",
      lga: "",
      ward: "",
      nin: "",
      phoneNo: "",
      payment: "",
    },
  });

  // Handle picture upload and preview
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPicture(file);
      setPictureError(null);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Form submission handler with proper types
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Check if picture is uploaded
    if (!picture) {
      setPictureError("Please upload a passport photograph");
      return;
    }

    setIsSubmitting(true);

    // Form data with picture
    const formData = {
      ...data,
      picture,
    };

    console.log("Submitting form data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Reset form handler
  const handleReset = () => {
    reset();
    setPicture(null);
    setPreviewUrl(null);
    setPictureError(null);
  };

  // Form field component to reduce repetition
  const FormField = ({
    label,
    name,
    type = "text",
    required = true,
    placeholder = "",
    options = [],
  }: FormFieldProps) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "select" ? (
        <select
          {...register(name)}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Personal Information
      </h1>

      {submitSuccess && (
        <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>Form submitted successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload Section - Now First */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
            Passport Photograph
          </h2>

          <div className="flex flex-col items-center">
            <div className="relative w-40 h-48 mb-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Passport Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPicture(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center p-4">
                  <User className="mx-auto h-16 w-16 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Passport Photo</p>
                </div>
              )}
            </div>

            {!previewUrl && (
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                <span>Upload Passport Photo</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handlePictureChange}
                />
              </label>
            )}

            {previewUrl && (
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mt-2">
                <Camera className="h-4 w-4 mr-2" />
                <span>Change Photo</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handlePictureChange}
                />
              </label>
            )}

            {pictureError && (
              <p className="text-red-500 text-sm mt-2">{pictureError}</p>
            )}

            <p className="text-xs text-gray-500 mt-3 text-center">
              Please upload a recent passport photograph with clear face
              visibility.
              <br />
              Photo should have plain background and be in portrait orientation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Left column fields */}
            <FormField
              label="Surname"
              name="surname"
              placeholder="Enter your surname"
            />
            <FormField
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
            />
            <FormField
              label="Middle Name"
              name="middleName"
              required={false}
              placeholder="Enter your middle name"
            />
            <FormField
              label="Gender"
              name="gender"
              type="select"
              options={["Male", "Female", "Other"]}
            />
            <FormField
              label="Age"
              name="age"
              type="number"
              placeholder="Enter your age"
            />
            <FormField
              label="Marital Status"
              name="maritalStatus"
              type="select"
              options={["Single", "Married", "Divorced", "Widowed"]}
            />
          </div>

          <div>
            {/* Right column fields */}
            <FormField
              label="Nationality"
              name="nationality"
              placeholder="Enter your nationality"
            />
            <FormField
              label="State"
              name="state"
              placeholder="Enter your state"
            />
            <FormField label="LGA" name="lga" placeholder="Enter your LGA" />
            <FormField
              label="Ward"
              name="ward"
              required={false}
              placeholder="Enter your ward"
            />
            <FormField
              label="NIN"
              name="nin"
              placeholder="Enter your 11-digit NIN"
            />
            <FormField
              label="Phone Number"
              name="phoneNo"
              placeholder="Enter your phone number"
            />
            <FormField
              label="Payment Method"
              name="payment"
              type="select"
              options={["Credit Card", "Bank Transfer", "Cash", "Mobile Money"]}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400 transition-colors"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
