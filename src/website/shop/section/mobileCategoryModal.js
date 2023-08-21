import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CheckList from "../../../component/checklist";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getAllFilteredVehicles } from "../../../store/features/vehicle/vehicleService";
import { COLORS } from "../../../utils/color";
import jsonData from "../../../data/carsData.json";

// const BRAND_LIST_DATA = []
//   "Acura",
//   "Alfa Romeo",
//   "Audi",
//   "BMW",
//   "Buick",
//   "Cadillac",
//   "Caliber",
//   "Chevrolet",
//   "Chrysler",
//   "Dodge",
//   "Toyota"
// ];

// const STYLE_DATA = []
//   "Acura ILX",
//   "Acura RDX",
//   "Acura TLX",
//   " Audi A3",
//   "Audi A4",
//   "Audi Q3",
//   "Audi Q5",
//   "BMW 3 Series",
//   "BMW 4 Series",
//   "BMW X1",
//   "BMW X3",
//   "BMW X5",
//   "Chevrolet Volt",
//   "Acura ILX",
//   "Acura RDX",
//   "Acura TLX",
//   "Audi A3",
//   "Audi A4",
//   "Audi Q3",
//   "Audi Q5",
//   "BMW 3 Series",
//   "BMW 4 Series",
//   "BMW X1",
//   "BMW X3",
//   "BMW X5",
//   "Chevrolet Volt",
//   "Acura ILX",
//   "Acura RDX",
//   "Acura TLX",
//   "Audi A3",
//   "Audi A4",
//   "Audi Q3",
//   "Audi Q5",
//   "BMW 3 Series",
//   "BMW 4 Series",
//   "BMW X1",
//   "BMW X3",
//   "BMW X5",
//   "Chevrolet Volt",
// ];

const BODY_TYPE_DATA = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Wagon",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
];

const EXTERIOR_COLOR = [
  "black",
  "white",
  "orange",
  "silver",
  "blue",
  "red",
  "maroon",
  "brown",
  "green",
  "yellow",
  "purple",
  "other",
];

const SEATS = [
  "2 seats",
  "4 seats",
  "5 seats",
  "6 seats",
  "7 seats",
  "8 seats",
  "9 seats",
];

const TRANSMISSIONS = ["Automatic", "Manual"];

const FUEL_TYPE = [
  "Gasoline/Mild Electric Hybrid",
  "Plug-in Hybrid",
  "Electric/Gas",
  "Gasoline",
  "Electric",
  "Hydrogen",
  "Hybrid",
  "Diesel",
];

const DRIVE_TRAINS = [
  "Front-Wheel Drive",
  "AWD",
  "4 Front-Wheel Drive",
  "Rigt-Wheel Drive",
];

const CYLINDERS = [
  "4",
  "Boxer (4 cyl.)",
  "Boxer (6 cyl)",
  "Flat-six",
  "Rotary",
  "3Cyl",
  "5Cyl",
  "2Cyl",
  "V12",
  "V10",
  "VR6",
  "I4",
  "V8",
  "V6",
  "V4",
  "I6",
  "I5",
  "H4",
  "I3",
];

const MobileCategoryModal = ({
  className,
  closeModal,
  filterList,
  applyFilter,
  setfilterList,
  reset,
}) => {
  const [BRAND_LIST_DATA, SET_BRAND_LIST_DATA] = useState([]);
  const [STYLE_DATA, SET_STYLE_DATA] = useState([]);
  const [priceRange, setPriceRange] = useState([4000, 60990]);
  const [yearRange, setYearRange] = useState([2000, new Date().getFullYear()]);
  const [mileageRange, setMileageRange] = useState([1, 1000]);
  const [selectedBrand, setselectedBrand] = useState([]);
  const [selectedStyle, setselectedStyle] = useState([]);
  const [selectedBodyTypes, setselectedBodyTypes] = useState([]);
  const [selectedColors, setselectedColors] = useState([]);
  const [selectedSeats, setselectedSeats] = useState([]);
  const [selectedDriveTrain, setselectedDriveTrain] = useState([]);
  const [selectedCylinders, setselectedCylinders] = useState([]);
  const [selectedFuelType, setselectedFuelType] = useState([]);
  const [selectedTransmission, setselectedTransmission] = useState([]);
  const dispatch = useDispatch();

  const blackTrackStyle = { backgroundColor: COLORS.primary };
  const blackHandleStyle = { borderColor: COLORS.primary };
  const [showPrice, setshowPrice] = useState(true);
  const [showYear, setshowYear] = useState(true);
  const [showMileage, setshowMileage] = useState(true);
  const [showBrands, setshowBrands] = useState(true);
  const [showAllBrandList, setshowAllBrandList] = useState(false);
  const [showStyle, setshowStyle] = useState(true);
  const [showAllStyleList, setshowAllStyleList] = useState(false);
  const [showBodyType, setshowBodyType] = useState(true);
  const [showColors, setshowColors] = useState(true);
  const [showSeats, setshowSeats] = useState(true);
  const [showTransmission, setshowTransmission] = useState(true);
  const [showDriveTrain, setshowDriveTrain] = useState(true);
  const [showCylinders, setshowCylinders] = useState(true);
  const [showFuelType, setshowFuelType] = useState(true);
  const [showAllCylinderList, setshowAllCylinderList] = useState(false);
  const [ filteredBrandsfromYear, setfilteredBrandsfromYear] = useState([])



function  filterDataByYearRange(range){
    const fromYear = parseInt(range[0]);
      const toYear = parseInt(range[1]);
      const data= jsonData.selections.years
    const filteredData = [];
    const uniqueMakes = new Set();
  


    const collectiveDataFromYear = data.filter((yearObject) => {
          const yearNum = parseInt(yearObject.name);
          return yearNum >= fromYear && yearNum <= toYear;
        });

  
     for (const item of collectiveDataFromYear) {
      const year = parseInt(item.name);
      if (fromYear <= year && year <= toYear) {
        const makes = item.makes;
        for (const make of makes) {
          const makeName = make.name;
          if (!uniqueMakes.has(makeName)) {
            uniqueMakes.add(makeName);
            // filteredData.push(make);
          }
        }
      }
    } 
    setshowAllBrandList(true)
    console.log("uniqueMakes", uniqueMakes)
    const brandListDataArray = Array.from(uniqueMakes);

    SET_BRAND_LIST_DATA(brandListDataArray);
    // console.log("brandDAta=======", filteredData)
    // uniqueMakes.length > 0 ? SET_BRAND_LIST_DATA(uniqueMakes) : SET_BRAND_LIST_DATA([])
    // console.log(BRAND_LIST_DATA)
    
    // SET_BRAND_LIST_DATA(uniqueMakes)
    // return filteredData;
    // setfilteredBrandsfromYear(filteredData)
    // const brandListOptions =filteredData.map((brand) => brand.makes);

    // const brandsCar = brandListOptions.map((i, v) => i);
    // const brandData = brandsCar.flatMap((data) => data.map((item) => item.name));
    // const style = brandsCar.flatMap((data) => data.map((item) => item.models));
    // const forStyle = style.flatMap((data) => data.map((item) => item.name));
    // SET_STYLE_DATA(forStyle);
   
  }
  
 
  const filterStylesByBrand = (selectedBrands) => {
    const stylesSet = new Set();
    const selectedBrandSet = new Set(selectedBrands);

    for (const item of jsonData.selections.years) {
      const makes = item.makes;
      for (const make of makes) {
        if (selectedBrandSet.has(make.name)) {
          const models = make.models;
          for (const model of models) {
            stylesSet.add(model.name);
          }
        }
      }
    }

    const stylesArray = Array.from(stylesSet);
    SET_STYLE_DATA(stylesArray);
  };


  useEffect(() => {
    filterDataByYearRange(yearRange);
  }, [yearRange]);

  useEffect(() => {
    filterStylesByBrand(selectedBrand);
  }, [selectedBrand]); 



  useEffect(() => {
    if (reset) {
      setPriceRange([4000, 60990]);
      setYearRange([2000, new Date().getFullYear()]);
      setMileageRange([1, 1000]);
      setselectedBrand([]);
      setselectedStyle([]);
      setselectedBodyTypes([]);
      setselectedColors([]);
      setselectedSeats([]);
      setselectedDriveTrain([]);
      setselectedCylinders([]);
      setselectedFuelType([]);
      setselectedTransmission([]);
    }
  }, [reset]);

  const handleFilter = (name, value) => {
    let temp = Object.assign({}, filterList);
    temp[name] = value;
    setfilterList(temp);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    handleFilter("priceRange", value);
  };

  const handleYearRangeChange = (value) => {
    setYearRange(value);
    handleFilter("year", value);
  };

  const handleMileageRangeChange = (value) => {
    setMileageRange(value);
    handleFilter("mileage", value);
  };

  return (
    <div className={"w-full bg-white overflow-y-auto h-full  " + className}>
      <div className="flex justify-between items-start">
        <p className="text-gray-700 text-2xl font-semibold">Select Filters</p>
        <div className="absolute right-10 flex space-x-3">
          <AiOutlineClose
            size={24}
            onClick={() => closeModal()}
            className="  hover:text-secondary opacity-70"
          />
        </div>
      </div>

      <div
        onClick={() => applyFilter()}
        className="text-primary flex py-1 mt-4 items-center justify-center text-xs hover:bg-primary w-[90%] hover:text-white duration-300 cursor-pointer border-2 rounded-full"
      >
        <p>Apply</p>
      </div>
      <div className="flex flex-col md:w-[15vw] mr-14 ">
        <div>
          <div
            onClick={() => setshowPrice(!showPrice)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Price</p>
            {showPrice ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>
          {showPrice ? (
            <div>
              <Slider
                range
                min={4000}
                max={60990}
                trackStyle={blackTrackStyle}
                handleStyle={blackHandleStyle}
                value={priceRange}
                onChange={handlePriceRangeChange}
              />
              <p className="text-sm mt-2 mb-6">
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
          ) : (
            <p className="text-sm mt-2 mb-6">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
          )}
          <div className="h-[1px] bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowYear(!showYear)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Year</p>
            {showYear ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>
          {showYear ? (
            <div>
              <Slider
                range
                min={2000}
                max={new Date().getFullYear()}
                trackStyle={blackTrackStyle}
                handleStyle={blackHandleStyle}
                value={yearRange}
                onChange={handleYearRangeChange}
              />
              <p className="text-sm mt-2 mb-6">
                Year: {yearRange[0]} - {yearRange[1]}
              </p>
            </div>
          ) : (
            <p className="text-sm mt-2 mb-6">
              {yearRange[0]} - {yearRange[1]}
            </p>
          )}
          <div className="h-[1px] bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowMileage(!showMileage)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Mileage</p>
            {showMileage ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>
          {showMileage ? (
            <div>
              <Slider
                range
                min={1}
                max={1000}
                trackStyle={blackTrackStyle}
                handleStyle={blackHandleStyle}
                value={mileageRange}
                onChange={handleMileageRangeChange}
              />
              <p className="text-sm mt-2 mb-6">
                Mileage: {mileageRange[0]} - {mileageRange[1]}
              </p>
            </div>
          ) : (
            <p className="text-sm mt-2 mb-6">
              {mileageRange[0]} - {mileageRange[1]}
            </p>
          )}
          <div className="h-[1px] bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowBrands(!showBrands)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Brands</p>

            {showBrands ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showBrands ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={
                  showAllBrandList
                    ? BRAND_LIST_DATA
                    : BRAND_LIST_DATA
                }
                seletedItemList={selectedBrand}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("brands", val);
                  setselectedBrand(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedBrand}
                seletedItemList={selectedBrand}
                setselectedListItems={(val) => setselectedBrand(val)}
              />
            </div>
          )}

          {BRAND_LIST_DATA.length > 0 && showBrands && (
            <p
              onClick={() => setshowAllBrandList(!showAllBrandList)}
              className="text-primary mt-4 cursor-pointertext-sm "
            >
              {showAllBrandList ? "Hide List ..." : "Load More ..."}
            </p>
          )}

          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowStyle(!showStyle)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Styles</p>

            {showStyle ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showStyle ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={
                  showAllStyleList ? STYLE_DATA : STYLE_DATA.slice(0, 11)
                }
                seletedItemList={selectedStyle}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("style", val);

                  setselectedStyle(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedStyle}
                seletedItemList={selectedStyle}
                setselectedListItems={(val) => setselectedStyle(val)}
              />
            </div>
          )}
          {STYLE_DATA.length > 0 && showStyle && (
            <p
              onClick={() => setshowAllStyleList(!showAllStyleList)}
              className="text-primary mt-4 cursor-pointertext-sm "
            >
              {showAllStyleList ? "Hide List ..." : "Load More ..."}
            </p>
          )}

          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowBodyType(!showBodyType)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Body Type</p>

            {showBodyType ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showBodyType ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={BODY_TYPE_DATA}
                seletedItemList={selectedBodyTypes}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("bodyType", val);

                  setselectedBodyTypes(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedBodyTypes}
                seletedItemList={selectedBodyTypes}
                setselectedListItems={(val) => {
                  handleFilter("bodyType", val);
                  setselectedBodyTypes(val);
                }}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowColors(!showColors)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Colors</p>

            {showColors ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showColors ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={EXTERIOR_COLOR}
                seletedItemList={selectedColors}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("colors", val);
                  setselectedColors(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedColors}
                seletedItemList={selectedColors}
                setselectedListItems={(val) => setselectedColors(val)}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowSeats(!showSeats)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Seats</p>

            {showSeats ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showSeats ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={SEATS}
                seletedItemList={selectedSeats}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("seats", val);

                  setselectedSeats(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedSeats}
                seletedItemList={selectedSeats}
                setselectedListItems={(val) => setselectedSeats(val)}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowTransmission(!showTransmission)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">
              Transmissions
            </p>

            {showTransmission ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showTransmission ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={TRANSMISSIONS}
                seletedItemList={selectedTransmission}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("transmission", val);

                  setselectedTransmission(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedTransmission}
                seletedItemList={selectedTransmission}
                setselectedListItems={(val) => setselectedTransmission(val)}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowFuelType(!showFuelType)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Fuel Type</p>

            {showFuelType ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showFuelType ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={FUEL_TYPE}
                seletedItemList={selectedFuelType}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("fuelType", val);

                  setselectedFuelType(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedFuelType}
                seletedItemList={selectedFuelType}
                setselectedListItems={(val) => setselectedFuelType(val)}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowDriveTrain(!showDriveTrain)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Drivetrains</p>

            {showDriveTrain ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showDriveTrain ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={DRIVE_TRAINS}
                seletedItemList={selectedDriveTrain}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("driveTrain", val);

                  setselectedDriveTrain(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedDriveTrain}
                seletedItemList={selectedDriveTrain}
                setselectedListItems={(val) => setselectedDriveTrain(val)}
              />
            </div>
          )}
          <div className="h-[1px] mt-4 bg-gray-300 w-[100%]" />
        </div>

        <div>
          <div
            onClick={() => setshowCylinders(!showCylinders)}
            className="flex flex-row justify-between items-center"
          >
            <p className="mt-5 mb-2 text-gray-700 font-semibold">Cylinders</p>

            {showCylinders ? (
              <BsChevronUp className="text-primary" size={18} />
            ) : (
              <BsChevronDown className="text-primary" size={18} />
            )}
          </div>

          {showCylinders ? (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={
                  showAllCylinderList ? CYLINDERS : CYLINDERS.slice(0, 11)
                }
                seletedItemList={selectedCylinders}
                setselectedListItems={(val) => {
                  console.log(val);
                  handleFilter("cylinders", val);
                  setselectedCylinders(val);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <CheckList
                itemTextClassName="text-sm pl-2"
                optionList={selectedCylinders}
                seletedItemList={selectedCylinders}
                setselectedListItems={(val) => setselectedCylinders(val)}
              />
            </div>
          )}

          {CYLINDERS.length > 0 && showCylinders && (
            <p
              onClick={() => setshowAllCylinderList(!showAllCylinderList)}
              className="text-primary mt-4 cursor-pointer text-sm "
            >
              {showAllCylinderList ? "Hide List ..." : "Load More ..."}
            </p>
          )}
          {/* <div className="h-[1px] mt-4 mb-10 bg-gray-300 w-[100%]"/> */}
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryModal;
