import { useState, useEffect } from "react";
import axios from "axios";
import Pledge from "../pledge/Pledge";
import Dashboard from "../dashboard/Dashboard";
import './ViewProject.css';
import CreatePledge from "../createpledge/CreatePledge";

function ViewProject() {
    const [showPledge, setShowPledge] = useState(false);
    const [showCreatePledge, setShowCreatePledge] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    const instance = axios.create({
        baseURL: 'https://s31510gc92.execute-api.us-east-2.amazonaws.com/Prod'
    }
    );

    let project_name = "";
    let email = "";

    const fillData = (projectData) => {
        console.log(document);
        var element = document.getElementsByClassName("data"), index;
        console.log(element);
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        // Project Name
        var projectName = document.getElementById("project-name");
        projectName.innerHTML = projectData.project_name;

        //projectName.appendChild(projectNameTxt);
        //Project Description
        var projectDesc = document.getElementById("project-description");
        projectDesc.innerHTML = projectData.project_description;
        // Goal
        var projectGoal = document.getElementById("project-goal");
        projectGoal.innerHTML = projectData.project_goal;
        // Genre
        var projectGenre = document.getElementById("project-genre");
        projectGenre.innerHTML = projectData.project_type;
        // Creator
        var projectCreator = document.getElementById("project-creator");
        projectCreator.innerHTML = projectData.designer_name;
        // Deadline
        var projectDeadline = document.getElementById("project-deadline");
        projectDeadline.innerHTML = projectData.project_deadline;

        projectData.project_pledges.forEach(pledge => {
            // Creating the Row
            var tr = document.createElement("tr");
            tr.className = "data";
            // Creating the Cells
            var pledgeDescription = document.createElement("td");
            pledgeDescription.className = "data";
            var maxSupporters = document.createElement("td");
            maxSupporters.className = "data";
            var amount = document.createElement("td");
            amount.className = "data";
            // Creating the Text in the Cells
            var pledgeDescriptionTxt = document.createTextNode(pledge.pledge_description);

            let maxSuppValue = pledge.pledge_max_supporters;
            if (maxSuppValue == 0) {
                maxSuppValue = "Unlimited";
            }
            var maxSupportersTxt = document.createTextNode(maxSuppValue);
            var amountTxt = document.createTextNode(pledge.pledge_amount);
            // Getting the Table
            var pledgeTable = document.getElementById("pledge-table");
            // Appending the Text to the Cells
            pledgeDescription.appendChild(pledgeDescriptionTxt);
            maxSupporters.appendChild(maxSupportersTxt);
            amount.appendChild(amountTxt);
            // Appending the Cells to the Row
            tr.appendChild(pledgeDescription);
            tr.appendChild(maxSupporters);
            tr.appendChild(amount);
            // Appending the Row to the Table
            pledgeTable.appendChild(tr);
        });
    }


    const sampleProject = {
        name: "Big Fork",
        description: "Funding for Sophie's big fork.",
        goal: "500 dollars",
        genre: "Startup",
        creator: "Sophia Cheng",
        deadline: "Tomorrow"
    };

    const fetchProject = () => {
        let data = { "designer_email": ViewProject.email, "project_name": ViewProject.project_name };
        console.log("about to fetch project : " + ViewProject.project_name);
        instance.post("/designer/project/view", data)
            .then(function (response) {
                console.log("RESPONSE");
                console.log(response)
                fillData(response.data.project)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        console.log("ViewProject : " + ViewProject.project);
        fetchProject();
    });

    const viewproject = (
        <div className="info-div">
            {/* img below will have src='url of project image' */}
            <img className='heading--logo' />
            <br></br>
            <label className="label-text">Project Name: </label>
            <div id="project-name"></div>
            <br></br>
            <label className="label-text">Description: </label>
            <div id="project-description"></div>
            <br></br>
            <label className="label-text">Goal: </label>
            <div id="project-goal"></div>
            <br></br>
            <label className="label-text">Genre: </label>
            <div id="project-genre"></div>
            <br></br>
            <label className="label-text">Creator: </label>
            <div id="project-creator"></div>
            <br></br>
            <label className="label-text">Deadline: </label>
            <div id="project-deadline"></div>
            <br></br>
            <table id="pledge-table" className="center">
                <tr>
                    <th>Pledge Description</th>
                    <th>Max Supporters</th>
                    <th>Amount</th>
                </tr>
            </table>
            <br></br>
            <button type="login" onClick={() => {
                CreatePledge.email = ViewProject.email;
                CreatePledge.project_name = ViewProject.project_name;
                setShowCreatePledge(true);
            }}>Create Pledge</button>
            <br></br>
            <button type="login" onClick={() => {
                console.log(ViewProject.email);
                Dashboard.email = ViewProject.email;
                setShowDashboard(true);
            }}>Return to Dashboard</button>
            {/* NOT NEEDED YET <button className="pledgebutton-vp" onClick={() => setShowPledge(true)} type="pledge">Pledge</button>*/}
        </div>
    );

    return (
        <div>
            {showDashboard ? <Dashboard /> : showCreatePledge ? <CreatePledge /> : viewproject}
        </div>
    )
};

export default ViewProject;