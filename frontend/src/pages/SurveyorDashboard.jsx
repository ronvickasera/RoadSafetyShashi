import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { getMySurveys } from "../services/surveyService";

function SurveyorDashboard() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSurveys() {
    try {
      const data = await getMySurveys();
      setSurveys(data.surveys);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSurveys();
  }, []);

  function statusClass(status) {
    if (status === "SUBMITTED") return "status-submitted";
    if (status === "OFFICER_APPROVED") return "status-approved";
    if (status === "REJECTED") return "status-rejected";
    return "";
  }

  return (
    <div>
      <Header />

      <main className="survey-container">
        <div className="page-heading">
          <div>
            <h1>Surveyor Dashboard</h1>
            <p>View and manage your road safety surveys.</p>
          </div>

          <button
            className="submit-button"
            onClick={() => navigate("/survey")}
          >
            + New Survey
          </button>
        </div>

        {loading && <p>Loading surveys...</p>}

        {!loading && surveys.length === 0 && (
          <div className="survey-card">
            <h3>No surveys found</h3>
            <button
              className="submit-button"
              onClick={() => navigate("/survey")}
            >
              Create Survey
            </button>
          </div>
        )}

        <div className="survey-list">
          {surveys.map((survey) => (
            <div className="survey-card" key={survey.id}>
              <div className="survey-header">
                <h3>{survey.road_name || "Road Survey"}</h3>
                <span className={statusClass(survey.status)}>
                  {survey.status}
                </span>
              </div>

              <p><strong>Zone:</strong> {survey.zone_name}</p>
              <p><strong>Circle:</strong> {survey.circle_name}</p>
              <p><strong>Ward:</strong> {survey.ward_name}</p>
              <p><strong>Issue:</strong> {survey.road_issue}</p>
              <p>
                <strong>Location:</strong>{" "}
                {survey.latitude}, {survey.longitude}
              </p>

              {survey.status === "REJECTED" && (
                <div className="rejection-box">
                  <h4>Officer Rejection Comments</h4>
                  <p>{survey.officer_comments}</p>

                  <button
                    className="submit-button"
                    onClick={() =>
                      navigate(`/survey/edit/${survey.id}`)
                    }
                  >
                    Correct & Resubmit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SurveyorDashboard;
