import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/api";
import getLabelString from "../lang/getLabelString";
export default function Dashboard() {
  const [village, setVillage] = useState("0");
  const [people, setPeople] = useState("0");
  useEffect(() => {
    axiosInstance.get("/people/total")
      .then((res) => {
        setPeople(res.data.COUNT.total);
      });
  }, []);
  useEffect(() => {
    axiosInstance.get("/village/total")
      .then((res) => {
        setVillage(res.data.COUNT.total);
      });
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-3">
              <div className="p-3 dash-box indigo rounded">
                <div className="d-grid align-items-center">
                  <div className="rounded-circl text-center p-3 dash-count indigo">
                    {village}
                  </div>
                  <div className="ps-3 text-center mt-1">
                    <strong className="fw-bold">{getLabelString('village')}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3">
              <div className="p-3 dash-box orange rounded">
                <div className="d-grid align-items-center">
                  <div className="rounded-circl text-center p-3 dash-count orange">
                    {people}
                  </div>
                  <div className="ps-3 text-center mt-1">
                    <strong className="fw-bold">{getLabelString('people')}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12 py-4">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-3 mt-1">
                  <Link
                    to="/village/add"
                    className="naviBtn fit"
                  >
                    <i className="bi bi-plus-square-dotted"></i>
                    <span>{getLabelString('add_new_village')}</span>
                  </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-3 mt-1">
                  <Link
                    to="/people/add"
                    className="naviBtn git"
                  >
                    <i className="bi bi-plus-square-dotted"></i>
                    <span>{getLabelString('add_people')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
