import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { BsFilterSquare } from "react-icons/bs";
import "./land.css";
import Background from "./background.png";
import Yahoo from "./yahoo.png";
import Peg from "./peg.png";
import Bearny from "./smart.png";
import AppImg from "./app.png";
import back_plan  from "./back-plan-img.png";
const cards = [
  {
    title: "Find a Diet you love",
    desc: "Lorem ipsum dolor, sit amet consectetur magnam consequuntur in cumque ab temporibus",
  },
  {
    title: "Find a Diet you love",
    desc: "Lorem ipsum dolor, sit amet consectetur magnam consequuntur in cumque ab temporibus",
  },
  {
    title: "Find a Diet you love",
    desc: "Lorem ipsum dolor, sit amet consectetur magnam consequuntur in cumque ab temporibus",
  },
];

const plans = [
  {
    subtitle: "3 week weight Loss",
    desc: "Lorem ipsum dolor sit amet consectetur recusandae! Assumenda possimus doloremque totam, reiciendis aut at ratione numquam",
  },
  {
    subtitle: "3 week weight Loss",
    desc: "Lorem ipsum dolor sit amet consectetur recusandae! Assumenda possimus doloremque totam, reiciendis aut at ratione numquam",
  },
  {
    subtitle: "3 week weight Loss",
    desc: "Lorem ipsum dolor sit amet consectetur recusandae! Assumenda possimus doloremque totam, reiciendis aut at ratione numquam",
  },
];

function Land() {
  return (
    <div className="landed">
      <div className="land">
        <div className="land-part-1">
          <div className="empty"></div>
          <div className="big-text">
            <span className="green-title">Healthy Living.</span>
            <div className="black-title">Simplified.</div>
          </div>
          <div className="land-desc">
            <div className="txt-1">
              The digital self-care app that helps you reach Your
            </div>
            <div className="txt-2">
              health and weight goals through better eating.
            </div>
          </div>
          <div className="email-box-lan">
            <input type="text" placeholder="Email address" />
            <button type="submit" className="btn-land">
              <FaArrowRight />
            </button>
          </div>
          <div className="integrations">
            <div>Integrations: </div>
            {[Yahoo, Peg, Bearny].map((src, index) => (
              <img key={index} src={src} alt={`Integration ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="land-part-2">
          <img src={Background} alt="Background" />
        </div>
      </div>

      <div className="second-part">
        <div className="section-1">
          <div className="question">What is Food Zone?</div>
          <div className="answer">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sed
            <br />
            placeat illo animi, ullam aperiam officia at voluptate quasi dolore
          </div>
        </div>
        {[...Array(2)].map((_, index) => (
          <div key={index} className={`section-${index + 2}`}>
            {cards.map((card, idx) => (
              <div key={idx} className="card">
                <div className="card-logo">
                  <BsFilterSquare />
                </div>
                <div className="card-title">{card.title}</div>
                <div className="card-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mobile-app">
        <div className="mobile-part-1">
          <img src={AppImg} alt="App" className="mobile-pic" />
        </div>
        <div className="mobile-part-2">
          <button type="submit" className="mobile-btn">
            Download app
          </button>
          <div className="mobile-title">Get the app</div>
          <div className="mobile-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut <br />
            distinctio aperiam quis doloribus a delectus tempore nihil <br />
            blanditiis placeat, ipsa non aliquam
          </div>
        </div>
      </div>

      <div className="plans">
        <div className="plans-table">
          <div className="plan-title">
            Meal Plans <br /> for everyone
          </div>
          {plans.map((plan, idx) => (
            <div key={idx} className="plan-exp">
              <div className="plan-exp-logo">
                <BsFilterSquare />
              </div>
              <div className="plan-exp-content">
                <div className="plan-subtitle">{plan.subtitle}</div>
                <div className="plan-desc">{plan.desc}</div>
              </div>
            </div>
          ))}
          <div className="demo-btn">
            <button className="demo-btn-btn" type="submit">
              Schedule Demo
            </button>
          </div>
        </div>
        <div className="plan-images">
          <div className="back-img-plan">
            <img src={back_plan} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Land;
