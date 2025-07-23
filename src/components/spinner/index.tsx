import { Spinner } from "reactstrap";

export default function PageSpinner() {
  return (
    <>
      <div className="vh-100 bg-dark d-flex justify-content-center align-items-center">
        <Spinner animation="border" color="light"></Spinner>
      </div>
    </>
  );
}
