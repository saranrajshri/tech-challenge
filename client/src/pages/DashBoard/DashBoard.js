import React, { Component, Suspense, useContext, useState } from "react";
import Card from "../../global-components/Card/Card";
import "./DashBoard.css";
import uuid from "react-uuid";
import { Context } from "../../context/Context";
import Draggable from "react-draggable";
import Sidebar from "../../global-components/Sidebar/Sidebar";
import { Row, Column } from "simple-flexbox";
import Chart from "react-apexcharts";
import Modal from "../../global-components/Modal/Modal";

const DashBoard = () => {
  const [state, dispatch] = useContext(Context);
  const [componentsList, setComponentsList] = useState(state.componentsList);
  const [isModalOpen, setModal] = useState(false);

  // Force Update hook
  const useForceUpdate = () => {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  };
  const forceUpdate = useForceUpdate();

  // Handle Each component click
  const handleClick = (componentType) => {
    if (componentType === "card") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "card",
          styles: {
            card: {
              backgroundColor: "#fff",
              margin: 10,
              border: "1px solid #cecece",
              width: 400,
              position: "absolute",
              top: 0,
              left: 0,
              userSelect: "none",
            },
            cardHeader: {
              backgroundColor: "#fdfdfd",
              borderBottom: "1px solid #e4e4e4",
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: "Poppins",
              color: "#34495e",
            },
            cardContent: {
              padding: 20,
            },
          },
          content: {
            title: "CARD TITLE",
            text: "fgjs",
            components: [],
          },
        },
      ]);
    } else if (componentType === "text") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "text",
          styles: {
            text: {
              fontFamily: "Poppins",
              margin: 10,
              fontSize: 12,
              position: "absolute",
              userSelect: "none",
            },
          },
          content: {
            text: "TITLE",
          },
        },
      ]);
    } else if (componentType === "lineChart") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "graph",
          chartType: "line",
          styles: {
            position: {
              position: "absolute",
              top: 0,
              left: 0,
            },
          },
          data: {
            series: [
              {
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
              },
            ],
            options: {
              chart: {
                height: 350,
                type: "line",
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              title: {
                text: "Product Trends by Month",
                align: "left",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                ],
              },
            },
          },
        },
      ]);
    } else if (componentType === "barChart") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "graph",
          chartType: "bar",
          styles: {
            position: {
              position: "absolute",
              top: 0,
              left: 0,
            },
          },
          data: {
            series: [
              {
                name: "Inflation",
                data: [
                  2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
                ],
              },
            ],
            options: {
              chart: {
                height: 350,
                type: "bar",
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: "top", // top, center, bottom
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "%";
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"],
                },
              },

              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                position: "top",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                crosshairs: {
                  fill: {
                    type: "gradient",
                    gradient: {
                      colorFrom: "#D8E3F0",
                      colorTo: "#BED1E6",
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              yaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
              title: {
                text: "Monthly Inflation in Argentina, 2002",
                floating: true,
                offsetY: 330,
                align: "center",
                style: {
                  color: "#444",
                },
              },
            },
          },
        },
      ]);
    } else if (componentType === "pieChart") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "graph",
          chartType: "pie",
          styles: {
            position: {
              position: "absolute",
              top: 0,
              left: 0,
            },
          },
          data: {
            series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: "pie",
              },
              labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            },
          },
        },
      ]);
    } else if (componentType === "areaChart") {
      setComponentsList([
        ...componentsList,
        {
          id: uuid(),
          type: "graph",
          chartType: "area",
          styles: {
            position: {
              position: "absolute",
              top: 0,
              left: 0,
            },
          },
          data: {
            series: [
              {
                name: "STOCK ABC",
                data: [],
              },
            ],
            options: {
              chart: {
                type: "area",
                height: 350,
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },

              title: {
                text: "Fundamental Analysis of Stocks",
                align: "left",
              },
              subtitle: {
                text: "Price Movements",
                align: "left",
              },
              labels: [],
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                opposite: true,
              },
              legend: {
                horizontalAlign: "left",
              },
            },
          },
        },
      ]);
    }
  };

  const handleComponentClick = (componentId) => {
    var selectedComponentIndex = 0;

    for (var i = 0; i < componentsList.length; i++) {
      if (componentsList[i].id === componentId) {
        selectedComponentIndex = i;
        break;
      }
    }

    const dummyComponentList = componentsList;
    const selectedComponent = dummyComponentList[selectedComponentIndex];

    setComponentsList(dummyComponentList);

    // update the components list in the global state
    dispatch({
      type: "SET_SELECTED_COMPONENT_LIST",
      payload: selectedComponentIndex,
    });
    dispatch({ type: "SET_COMPONENTS_LIST", payload: dummyComponentList });

    // re render the page
    forceUpdate();
  };

  const reFetchComponentsList = () => {
    const updatedComponentsList = state.componentsList;
    setComponentsList(updatedComponentsList);
    console.log(componentsList);
  };
  console.log(state.user);

  const handleDrag = (e, d, componentClass) => {
    console.log("dknf");
    const dummyList = componentsList;
    const component = componentsList[state.selectedComponentIndex];

    // console.log(component);

    component.styles[componentClass].left += d.deltaX;
    component.styles[componentClass].top += d.deltaY;

    dispatch({
      type: "SET_COMPONENTS_LIST",
      payload: dummyList,
    });
    console.log(state.componentsList);
  };

  return (
    <div>
      <Row>
        <Column flexGrow={9} className="dasboard__canvas">
          {componentsList.map((component) => {
            if (component.type === "card") {
              return (
                <Draggable onDrag={(e, d) => handleDrag(e, d, "card")}>
                  <div
                    onClick={() => {
                      handleComponentClick(component.id);
                    }}
                  >
                    <Card
                      id={component.id}
                      customStyles={component.styles}
                      content={component.content}
                    />
                  </div>
                </Draggable>
              );
            } else if (component.type === "text") {
              return (
                <div
                  onClick={() => {
                    handleComponentClick(component.id);
                  }}
                >
                  <Draggable>
                    <p style={component.styles.text}>
                      {component.content.text}
                    </p>
                  </Draggable>
                </div>
              );
            } else if (component.type === "graph") {
              return (
                <div
                  onClick={() => {
                    handleComponentClick(component.id);
                  }}
                >
                  <Draggable onDrag={(e, d) => handleDrag(e, d, "position")}>
                    <Chart
                      style={component.styles.position}
                      options={component.data.options}
                      series={component.data.series}
                      type={component.chartType}
                      height={300}
                      width={350}
                    />
                  </Draggable>
                </div>
              );
            }
          })}
        </Column>
        <Column flexGrow={3}>
          <Sidebar
            setModal={setModal}
            reFetchComponentsList={reFetchComponentsList}
            addComponent={(componentType) => handleClick(componentType)}
          />
        </Column>
      </Row>
      <Modal
        open={isModalOpen}
        handleClose={() => {
          setModal(false);
        }}
      />
    </div>
  );
};

export default DashBoard;
