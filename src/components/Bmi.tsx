import React from "react";
import { motion } from "framer-motion";

export default function () {
  const [weight, setWeight] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [bmi, setBmi] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>("");

  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom: any) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  };

  const calcBmi = (e: any): void => {
    e.preventDefault();
    if (weight == 0 || height == 0) {
      alert("Enter valid weight and height");
    } else {
      let bmi = weight / (((height / 100) * height) / 100);
      setBmi(bmi);
      if (bmi < 25) {
        setMessage("You are underweight, try to eat more");
      } else if (bmi >= 25 && bmi < 30) {
        setMessage("You are at a healthy weight, keep it up");
      } else {
        setMessage("You are overweight, consult a nutritionist");
      }
    }
  };

  const handleReset = (): void => {
    window.location.reload();
  };

  let imgSrc: string;
  if (bmi < 1) {
    imgSrc = require("../assets/default_img.png");
  } else {
    if (bmi < 25) {
      imgSrc = require("../assets/underweight_img.png");
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require("../assets/healthy_img.png");
    } else {
      imgSrc = require("../assets/overweight_img.png");
    }
  }
  return (
    <div className="bmi-container">
      <motion.div initial="hidden" whileInView="visible" className="bmi">
        <motion.h2 custom={1} variants={textAnimation}>
          BMI Calculator
        </motion.h2>
        <motion.form onSubmit={calcBmi} custom={2} variants={textAnimation}>
          <div className="weight">
            <label>
              <b>Weight (kg)</b>
            </label>
            <input
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => {
                setWeight(Number(e.target.value));
              }}
            />
          </div>
          <div className="height">
            <label>
              <b>Height (cm)</b>
            </label>
            <input
              placeholder="Enter your height"
              value={height}
              onChange={(e) => {
                setHeight(Number(e.target.value));
              }}
            />
          </div>
          <div className="btns">
            <button type="submit">Submit</button>
            <button className="reset" onClick={handleReset} type="submit">
              Reset
            </button>
          </div>
        </motion.form>
        <motion.div custom={3} variants={textAnimation} className="result">
          <h3>Your BMI is: {bmi ? bmi.toFixed(2) : "0"}</h3>
          {message}
        </motion.div>
        <motion.div custom={4} variants={textAnimation} className="img-result">
          <img src={imgSrc}></img>
        </motion.div>
      </motion.div>
    </div>
  );
}
