$( document ).ready(function() {

    var loadPriorities = function(callback) {
        $.ajax({
            url: window.base_url + "/enumerations/issue_priorities.json?key=" + window.api_key,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(data) {
              window.issue_priorities = data.issue_priorities;
              callback(true);
            },
            error: function() {
                alert('Failed!');
                callback(false);
            },
        });
    };

    loadPriorities(function(prioritiesLoaded) {

        if (!prioritiesLoaded) {
            return;
        }

        var priorityCell = function(issueId, selectedPriority) {
            var result = "<select id='priority_" + issueId + "'>";
            $.each(window.issue_priorities, function (index, priority) {
                result += '<option ' + (selectedPriority.id == priority.id ? "selected":"") + ' value="' + priority.id + '">' + priority.name + '</option>';
            });
            result += "</select>"
            return result;
        };

        var loadIssues = function(projectId) {
            $.ajax({
                url: window.base_url + "/issues.json?key=" + window.api_key + "&project_id=" + projectId,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function (data) {
                    $("tbody#issues").empty();
                    $.each(data.issues, function (index, issue) {
                        $("tbody#issues").append("<tr issueId='" + issue.id + "'><td class='project'>" + issue.project.name
                            + "</td><td class='idCell'>" + issue.id
                            + "</td><td class='subject'>" + issue.subject
                            + "</td><td class='priority'>" + priorityCell(issue.id, issue.priority)
                            + "</td><td class='action'><button class='delete'><img src='/static/images/delete.png' width='20' height='20' /></button></td></tr>");
                        $("#priority_"+issue.id).change(function () {
                            setPriority(issue.id, $("#priority_"+issue.id +" option:selected").attr('value'));
                        });
                    });
                    $(".delete").click(function () {
                        var issueId = $(this).parent().parent().attr('issueId');
                        deleteIssue(issueId);
                    });
                    makeEditable();
                },
                error: function () {
                    alert('Failed!');
                },
            });
        };

        $("select").change(function () {
            var projectId = $("select option:selected").attr('value');
            loadIssues(projectId);
        });

        $("#create").click(function () {
            var projectId = $("select option:selected").attr('value');
            createIssue(projectId, 'New issue');
        });

        $.ajax({
            url: window.base_url + "/projects.json?key=" + api_key,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (data) {
                $.each(data.projects, function (index, project) {
                    if (project.status === 1) {
                        $("select").append('<option value="' + project.id + '">' + project.name + '</option>');
                    }
                    ;
                });
            },
            error: function () {
                alert('Failed!');
            },
        });

        var setPriority = function(issueId, priorityId) {
            $.ajax({
                url: "/commands/set_issue_priority",
                type: 'PUT',
                data: JSON.stringify({id: issueId, priorityId: priorityId}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    console.log("DONE");
                },
                error: function () {
                    alert('Failed!');
                },
            });
        };

        var setSubject = function(issueId, subject) {
            $.ajax({
                url: "/commands/set_issue_subject",
                type: 'PUT',
                data: JSON.stringify({id: issueId, subject: subject}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    console.log("DONE");
                },
                error: function () {
                    alert('Failed!');
                },
            });
        };

        var createIssue = function (projectId, subject) {
            $.ajax({
                url: "/commands/create_issue",
                type: 'POST',
                data: JSON.stringify({project_id: projectId, subject: subject}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    loadIssues(projectId);
                },
                error: function () {
                    alert('Failed!');
                },
            });
        };

        var deleteIssue = function (issueId) {
            if (confirm("Are you sure?")) {
                $.ajax({
                    url: "/commands/delete_issue",
                    type: 'POST',
                    data: JSON.stringify({issue_id: issueId}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {
                        var projectId = $("select option:selected").attr('value');
                        loadIssues(projectId);
                    },
                    error: function () {
                        alert('Failed!');
                    },
                });
            }
        };

        var makeEditable = function () {
            $("td.subject").dblclick(function () {
                var OriginalContent = $(this).text();
                $(this).addClass("cellEditing");
                $(this).html("<input type='text' value='" + OriginalContent + "' />");
                $(this).children().first().focus();
                var issueId = $(this).parent().attr("issueid");
                $(this).children().first().keypress(function (e) {
                    if (e.which == 13) {
                        var newContent = $(this).val();
                        $(this).parent().text(newContent);
                        $(this).parent().removeClass("cellEditing");
                        setSubject(issueId, newContent);
                    }
                });
                $(this).children().first().blur(function () {
                    $(this).parent().text(OriginalContent);
                    $(this).parent().removeClass("cellEditing");
                });
            });
        };
    });
    
});