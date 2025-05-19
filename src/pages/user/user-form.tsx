//@ts-nocheck
import { useState, ChangeEvent } from "react";
import {
  Check,
  Camera,
  X,
  Loader2,
  User,
  Mail,
  Home,
  Calendar,
  Book,
  CreditCard,
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the form data interface
interface FormData {
  surname: string;
  firstName: string;
  middleName?: string;
  gender: string;
  dateOfBirth: string;

  maritalStatus: string;
  email: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  ward?: string;
  residentialAddress: string;
  rank: string;
  educationLevel: string;
  nin: string;
  bvn?: string;
  phoneNo: string;
  alternatePhoneNo?: string;
  membershipType: string;
  payment: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  interests?: string;
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
    surname: yup.string().required("Surname is required").max(50),
    firstName: yup.string().required("First name is required").max(50),
    middleName: yup.string().optional().max(50),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),

    maritalStatus: yup.string().required("Marital status is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    nationality: yup.string().required("Nationality is required"),
    stateOfOrigin: yup.string().required("State of origin is required"),
    lga: yup.string().required("LGA is required"),
    ward: yup.string().optional(),
    residentialAddress: yup
      .string()
      .required("Residential address is required"),
    rank: yup.string().required("Rank/Postion is required"),
    educationLevel: yup.string().required("Education level is required"),
    nin: yup
      .string()
      .required("NIN is required")
      .matches(/^\d{11}$/, "NIN must be exactly 11 digits"),
    bvn: yup
      .string()
      .optional()
      .matches(/^\d{11}$/, "BVN must be exactly 11 digits"),
    phoneNo: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    alternatePhoneNo: yup
      .string()
      .optional()
      .matches(/^\d{11}$/, "Alternate phone must be exactly 11 digits"),
    membershipType: yup.string().required("Membership type is required"),
    payment: yup.string().required("Payment method is required"),
    emergencyContactName: yup
      .string()
      .required("Emergency contact name is required"),
    emergencyContactPhone: yup
      .string()
      .required("Emergency contact phone is required")
      .matches(/^\d{11}$/, "Emergency contact must be exactly 11 digits"),
    interests: yup.string().optional().max(200),
  });

  // Initialize react-hook-form with proper types
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      surname: "",
      firstName: "",
      middleName: "",
      gender: "",
      dateOfBirth: "",

      maritalStatus: "",
      email: "",
      nationality: "",
      stateOfOrigin: "",
      lga: "",
      ward: "",
      residentialAddress: "",
      rank: "",
      educationLevel: "",
      nin: "",
      bvn: "",
      phoneNo: "",
      alternatePhoneNo: "",
      membershipType: "",
      payment: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      interests: "",
    },
  });

  // Handle picture upload and preview
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type and size
      if (!file.type.match("image.*")) {
        setPictureError("Please upload an image file (JPEG, PNG)");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setPictureError("Image size should not exceed 2MB");
        return;
      }

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
        Membership Registration Form
      </h1>

      {submitSuccess && (
        <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>
            Form submitted successfully! Welcome to our membership program.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload Section */}
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
              Please upload a recent passport photograph (JPEG or PNG, max 2MB)
              with clear face visibility. Photo should have plain white
              background and be in portrait orientation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Personal Information Section */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>

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
              placeholder="Enter your middle name (if any)"
            />
            <FormField
              label="Gender"
              name="gender"
              type="select"
              options={["Male", "Female", "Other", "Prefer not to say"]}
            />
            <FormField label="Date of Birth" name="dateOfBirth" type="date" />

            <FormField
              label="Marital Status"
              name="maritalStatus"
              type="select"
              options={[
                "Single",
                "Married",
                "Divorced",
                "Widowed",
                "Separated",
              ]}
            />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            {/* Contact and Identification Section */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Contact & Identification
            </h3>

            <FormField
              label="Nationality"
              name="nationality"
              placeholder="Enter your nationality"
            />
            <FormField
              label="State of Origin"
              name="stateOfOrigin"
              placeholder="Enter your state of origin"
            />
            <FormField
              label="LGA"
              name="lga"
              placeholder="Enter your Local Government Area"
            />
            <FormField
              label="Ward"
              name="ward"
              required={false}
              placeholder="Enter your ward (if applicable)"
            />
            <FormField
              label="Residential Address"
              name="residentialAddress"
              placeholder="Enter your full residential address"
            />
            <FormField
              label="Rank/Position"
              name="rank"
              placeholder="Enter your rank or position"
            />
            <FormField
              label="Education Level"
              name="educationLevel"
              type="select"
              options={[
                "Primary",
                "Secondary",
                "Diploma",
                "Bachelor's Degree",
                "Master's Degree",
                "PhD",
                "Other",
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Identification Numbers */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Identification Numbers
            </h3>

            <FormField
              label="National Identification Number (NIN)"
              name="nin"
              placeholder="Enter your 11-digit NIN"
            />
            <FormField
              label="Bank Verification Number (BVN)"
              name="bvn"
              required={false}
              placeholder="Enter your 11-digit BVN (optional)"
            />
          </div>

          <div>
            {/* Contact Information */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Contact Information
            </h3>

            <FormField
              label="Phone Number"
              name="phoneNo"
              placeholder="Enter your primary phone number"
            />
            <FormField
              label="Alternate Phone Number"
              name="alternatePhoneNo"
              required={false}
              placeholder="Enter alternate phone number (optional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Membership Details */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Membership Details
            </h3>

            <FormField
              label="Membership Type"
              name="membershipType"
              type="select"
              options={[
                "Regular",
                "Premium",
                "VIP",
                "Student",
                "Senior Citizen",
                "Corporate",
              ]}
            />
            <FormField
              label="Payment Method"
              name="payment"
              type="select"
              options={[
                "Credit Card",
                "Debit Card",
                "Bank Transfer",
                "Cash",
                "Mobile Money",
                "POS",
              ]}
            />
          </div>

          <div>
            {/* Emergency Contact */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Emergency Contact
            </h3>

            <FormField
              label="Emergency Contact Name"
              name="emergencyContactName"
              placeholder="Full name of emergency contact"
            />
            <FormField
              label="Emergency Contact Phone"
              name="emergencyContactPhone"
              placeholder="Phone number of emergency contact"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            Additional Information
          </h3>

          <FormField
            label="Interests/Skills (Optional)"
            name="interests"
            required={false}
            placeholder="List your interests or skills relevant to our organization"
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex items-center mb-4">
            <input type="checkbox" id="agreeTerms" required className="mr-2" />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              I certify that the information provided is accurate and complete.
              I agree to the terms and conditions of membership.
            </label>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex items-center"
              onClick={handleReset}
            >
              <X className="h-4 w-4 mr-1" />
              Clear Form
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
                  Processing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
