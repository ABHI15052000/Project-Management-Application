import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { set } from "zod";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ArrowLeft, CheckCircle, Loader, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-grey-500">Verify your email...</p>
      <Card className="w-full max-w-md">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-gray-500 animate-spin mb-4" />
                <h3 className="text-lg font-semibold">
                  Verifying your email...
                </h3>
                <p className="text-sm text-gray-500">
                  Please wait while we are verifying your email.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="font-semibold text-lg">Email Verified!</h3>
                <p className="text-sm text-gray-500">
                  Your email has been successfully verified!
                </p>
                <Link
                  to="/sign-in"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <ArrowLeft className="mr-2" />
                  Back to Sign In
                </Link>
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="font-semibold text-lg">Verification Failed</h3>
                <p className="text-sm text-gray-500">
                  Email verification failed. Please try again.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
