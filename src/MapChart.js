import geoUrl from "./map2.json";
import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import * as d3 from "d3";


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


const MapChart = ({setTooltipContent, csvfile}) => {

  return (
    <>
      <ComposableMap data-tip=""
        width={500}
        height={400}
        style={{width:"100%", height:"auto"}}
        projection="geoAlbers"
        >
        <ZoomableGroup>
          <Geographies geography={geoUrl}
            fill="#D6D6DA"
            stroke="#FFFFFF"
            strokeWidth={0.5}>
            {({ geographies }) =>
              geographies.map(geo => {
                  return <Geography 
                    key={geo.rsmKey} 
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      
                      d3.csv(csvfile).then((data)=>{
                          let valuesBycounty = d3.rollup(data, v=>d3.greatest(v, d=>d.administered_date), d=>d.county);
                          let countyData = Array.from(valuesBycounty).filter(element => element[0]===NAME);
                          let total_doses = rounded(countyData[0][1]["cumulative_total_doses"]);
                          let date = countyData[0][1]["administered_date"]
                          setTooltipContent(`${NAME}--${total_doses} \n ${date}`);
                        })                      
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default:{
                        fill:"#D6D6DA",
                        outline:"none"
                      },
                      hover: {
                        fill: "#F53",
                        outline:"none",
                      },
                      pressed: {
                         outline: "none" 
                      },
                    }}
                  />
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
