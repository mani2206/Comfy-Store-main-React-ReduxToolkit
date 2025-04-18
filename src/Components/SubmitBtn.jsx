import { useNavigate } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      className="btn btn-primary btn-block"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;
