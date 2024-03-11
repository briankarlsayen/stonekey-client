import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface BasicButtonProps {
  isLoading?: boolean;
}

function BasicButton({ isLoading, ...props }: BasicButtonProps & ButtonProps) {
  return (
    <Button {...props} disabled={props?.disabled || isLoading}>
      {props.children}
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: "primary",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Button>
  );
}

export default BasicButton;
