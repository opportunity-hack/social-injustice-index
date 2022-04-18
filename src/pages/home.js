import React, { useEffect, useState } from 'react';
import Header from "../components/header"
import { FaPaypal } from 'react-icons/fa'
import Map from "../components/map"
import us_states from "../model/states"
import Select from 'react-select'
import data_controller from "../controllers/data_controller"

const Home = () => {

    // Holds the US State you clicked on the Map
    const [selectedMapState, setSelectedMapState] = useState("Arizona");
    const [currentData, setCurrentData] = useState([])
    let states_list = []

    // Reference to the state dropdown
    let state_dropdown = React.createRef()

    useEffect(() => {

        // Prepare the dropdown menu
        us_states.map((us_state) => {
            states_list.push({
                "value": us_state,
                "label": us_state
            })
        })

        // Auto focus on the state dropdown
        state_dropdown.current.focus();


        // Grab the latest data
        if (currentData.length == 0) {
            data_controller.get_latest_data().then((data) => {
                setCurrentData(data)
                // console.log()
            })
        }

    })

    return (
        <Header active={"home"}>
            <center>
                <div className={"scaffolded"}>
                    <h2>Welcome to <FaPaypal /> Social Injustice Index!</h2>
                </div>
                <Map
                    selectedMapState={selectedMapState}
                    setSelectedMapState={setSelectedMapState}
                />

                <h1 className="national_index">National Index: {currentData["national_index"]}</h1>

                <div className={"dropdown_container"}>
                    <Select
                        defaultValue={{ value: selectedMapState, label: selectedMapState }}
                        value={{ value: selectedMapState, label: selectedMapState }}
                        options={states_list}
                        ref={state_dropdown}
                        onChange={(state) => {
                            setSelectedMapState(state.value)
                        }}
                    ></Select>
                </div>


                <br />
                <div className={"data"}>
                    {currentData.length == 0 && <h1>Loading...</h1>}
                    <br />
                    {currentData.length != 0 &&
                        <div>
                            <div className={"metric"}>
                                <span className={"metric_value"}>{currentData.states_index_data["index"][selectedMapState]}</span>
                                <br />
                                <span className={"metric_name"}>Hate Index for {selectedMapState}</span>
                            </div>
                            <div className={"metric"}>
                                <span className={"metric_value"}>{currentData.states_index_data["num_hate"][selectedMapState]}</span>
                                <br />
                                <span className={"metric_name"}>Classified as Hate</span>
                            </div>
                            <div className={"metric"}>
                                <span className={"metric_value"}>{currentData.states_index_data["num_classified"][selectedMapState]}</span>
                                <br />
                                <span className={"metric_name"}>Total Classified</span>
                            </div>
                            <div className={"metric"}>
                                <span className={"metric_value"}>{currentData.states_index_data["normalized_index"][selectedMapState]}</span>
                                <br />
                                <span className={"metric_name"}>Normalized Index</span>
                            </div>
                        </div>
                    }
                </div>
            </center>
        </Header>
    )
}

export default Home