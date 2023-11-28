import React, { useState, useEffect } from "react";

const Images = () => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/8970cd3a-7231-4147-8df1-9dee9a25c9bb"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const respdata = await response.json();

        const urls = respdata.data.map(
          (resp) => resp?.attributes?.image?.large
        );
        setImageURLs(urls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const splitArray = (arr, numberOfDivisions) => {
    const result = [];
    const elementsPerDivision = Math.ceil(arr.length / numberOfDivisions);

    for (let i = 0; i < numberOfDivisions; i++) {
      const startIndex = i * elementsPerDivision;
      const endIndex = startIndex + elementsPerDivision;
      const division = arr.slice(startIndex, endIndex);
      result.push(division);
    }

    return result;
  };
  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let randompics = array.length - 1; randompics > 0; randompics--) {
      const randomNext = Math.floor(Math.random() * (randompics + 1));
      [array[randompics], array[randomNext]] = [
        array[randomNext],
        array[randompics],
      ];
    }
    return array;
  };
  const numberOfDivisions = Math.ceil(imageURLs.length / 5); // Adjust as needed

  return (
    <div className="gallery">
      {[...Array(numberOfDivisions)].map((_, index) => (
        <div key={index} className={`rowDiv${index + 1}`}>
          {shuffleArray(splitArray(imageURLs, numberOfDivisions)[index]).map(
            (url, idx) => (
              <div key={idx} className={`images${index + 1}`}>
                <img src={url} alt={`pics ${idx + 1}`} />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Images;
