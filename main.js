setEventListeners();
fetchIssues();

function setEventListeners(){
    document.querySelector('#frmIssue').addEventListener('submit', saveIssue);
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issueList'));
    let divIssueList = document.querySelector('#issuesList');

    divIssueList.innerHTML = '';

    if (issues && issues.length > 0) {
        for (let i = 0; i < issues.length; i++) {
            divIssueList.innerHTML += `<div class="well">
                                        <h6>Issue ID: ${issues[i].id}</h6>
                                        <p><span class="label label-info">${issues[i].status}</span></p>
                                        <h3>${issues[i].description}</h3>
                                        <p><span class="glyphicon glyphicon-time"></span>&nbsp;${issues[i].assignedTo}</p>
                                        <button class="btn btn-warning" onclick="modifyIssue('${issues[i].id}','changeStatus')">Close</button>
                                        <button class="btn btn-danger" onclick="modifyIssue('${issues[i].id}','deleteIssue')">Delete</button>
                                       </div>`;
        }
    }
}

function saveIssue(e) {

    //// fetch values from the form
    let frmIssue = document.querySelector('#frmIssue');
    let issueDescription = document.querySelector('#issueDescription').value;
    let issueSeverity = document.querySelector('#issueSeverity').value;
    let issueAssignedTo = document.querySelector('#issueAssignedTo').value;

    //// validate form
    if (isFormValid(issueDescription, issueAssignedTo)) {
        // assign values to the issue object
        let issue = {
            id: chance.guid(),
            status: 'Open',
            description: issueDescription,
            severity: issueSeverity,
            assignedTo: issueAssignedTo
        };

        let issueList = localStorage.getItem('issueList') === null ? []: JSON.parse(localStorage.getItem('issueList'));
        issueList.push(issue);
        localStorage.setItem('issueList', JSON.stringify(issueList));

        fetchIssues();

        frmIssue.reset();
        e.preventDefault();
    } else {
        console.log('Enter form values');
        e.preventDefault();
    }
}

function isFormValid(issueDescription, issueAssignedTo) {
    if (issueDescription === '' || issueAssignedTo === '') {
        return false;
    } else {
        return true;
    }
}

function modifyIssue(issueId, modificationType) {
    // localStorage.removeItem('issueList');        // remove this key from localStorage
    // localStorage.clear();                        // remove everything from localStorage

    let issueList = JSON.parse(localStorage.getItem('issueList'));
    
    issueList.map(issue => {
        if (issue.id === issueId) {
            if (modificationType === 'changeStatus') {
                issue.status = 'Close'; 
            } else if (modificationType === 'deleteIssue') {
                issue.splice(i, 1);    
            }
        }
    });

    for(var i = 0; i < issueList.length; i++) {
        if (issueList[i].id === issueId) {
            if (modificationType === 'changeStatus') {
                issueList[i].status = 'Close'; 
            } else if (modificationType === 'deleteIssue') {
                issueList.splice(i, 1);    
            }
        }
    }

    localStorage.setItem('issueList', JSON.stringify(issueList));
    fetchIssues();
}

function deleteAllIssues(key) {
    let frmIssue = document.querySelector('#frmIssue');
    frmIssue.target = "";
    localStorage.removeItem(key);
    fetchIssues();
}