import { Link } from "react-router-dom";
import phoneImg from "../assets/photos/phone2.png";
export function LandingPage() {
  return (
    <section className="landingPageOne">
      <div className="landingWrapper">
        <div className="linkWrapper">
          <h1>
            Сигурност со <span> клик !</span>{" "}
          </h1>
          <div className="wrapperBtns">
            <Link to={"/signIn"}>
              <div className="landingPageBtn">Најави се</div>
            </Link>
            <Link to={"/register"}>
              <div className="landingPageBtn">Регистрирај се</div>
            </Link>
          </div>
        </div>
        <div className="phoneImgOne">
          <img src={phoneImg} alt="" />
        </div>
      </div>
    </section>
  );
}
