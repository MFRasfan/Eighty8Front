import React, { useState, useEffect } from "react";
import Button from "../../../component/button";
import data from "../../../data/carsData.json";
import { categories } from "../../../data/category";
import { useNavigate } from "react-router-dom";

export const CategoryContainer = ({ item, index }) => {
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState([]);
  const [makeTitle, setMakeTitle] = useState("Browse by make and model");
  const [styleTitle, setStyleTitle] = useState("Browse by Style");

  // const makeTitle = "Browse by make and model";
  // const styleTitle = "Browse by Style";
  // setMakeTitle(makeTitle);
  useEffect(() => {
    const storedModels = localStorage.getItem("selectedModels");
    if (storedModels) {
      setCars(JSON.parse(storedModels));
    } else {
      const filteredYears = data.selections.years.filter(
        (year) => year.name >= 2008 && year.name <= 2023
      );
      const carsFrom2020To2023 = [];
      const yearLimit = 10;

      for (let i = filteredYears.length - 1; i >= 0; i--) {
        const year = filteredYears[i];
        for (let j = year.makes.length - 1; j >= 0; j--) {
          const make = year.makes[j];
          console.log(make);
          const makeCars = make.models.slice(0, yearLimit).map((model) => ({
            year: year.id,
            make: make.models[0].name,
            model: model.name,
          }));

          carsFrom2020To2023.push(...makeCars);

          if (carsFrom2020To2023.length >= 200) {
            break;
          }
        }

        if (carsFrom2020To2023.length >= 200) {
          break;
        }
      }

      const topModels = carsFrom2020To2023.slice(-1000);

      const shuffleArr = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledModels = shuffleArr(topModels);

      const selectedModels = [];
      const selectedMakes = new Set();
      const MAX_UNIQUE_MODELS = 60;

      for (const model of shuffledModels) {
        const make = model.make;
        const modelName = model.model;

        if (
          !selectedMakes.has(make) &&
          !selectedModels.some((m) => m.model === modelName)
        ) {
          selectedMakes.add(make);
          selectedModels.push(model);
          if (selectedModels.length === MAX_UNIQUE_MODELS) {
            break;
          }
        }
      }

      localStorage.setItem("selectedModels", JSON.stringify(selectedModels));
      console.log(selectedModels);
      setCars(selectedModels);
     
    }
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <div className="px-20 text-center">
      <p className={`text-3xl  font-bold text-gray-700 my-20`}>{makeTitle}</p>
      <div class="grid grid-cols-2 gap-4  md:grid-cols-4 md:gap-4">
        {cars.map((item, index) => (
          <div onClick={() => navigate(`/shop?${item.make}`)}>
            <p className="text-gray-700 hover:text-primary hover:font-bold  duration-300 ease-in-out cursor-pointer">
              {item.model}
            </p>
          </div>
        ))}
      </div>
      <p className={`text-3xl  font-bold text-gray-700 my-20`}>{styleTitle}</p>
      <div class="grid grid-cols-2 gap-4  md:grid-cols-4 md:gap-4">
        {cars.map((item, index) => (
          <div onClick={() => navigate(`/shop?${item.model}`)}>
            <p className="text-gray-700 hover:text-primary hover:font-bold  duration-300 ease-in-out cursor-pointer">
              {item.make}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BrowseByCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      {/* {categories.map((item, index) => CategoryContainer(item, index))} */}
      <p className="text-3xl text-gray-700 text-center pt-20 pb-10 font-bold">
        Buy your next car online
      </p>
      <div className="flex items-center justify-center">
        <Button title={"Shop cars"} onClick={() => navigate("/shop")} />
      </div>
    </div>
  );
};

export default BrowseByCategory;
