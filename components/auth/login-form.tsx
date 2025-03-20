import React from "react";
import CardWrapper from "./card-wrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      cardTitle="Auth"
      headerLabel="Welcome Back"
      backButtonLabel="Don't Have an account? &nbsp;"
      backButtonLinkLabel={" Create A New Account!"}
      backButtonHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
}
