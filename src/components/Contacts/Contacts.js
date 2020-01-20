import React from "react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

import logo from "../../assets/img/new-big-logo.svg";

import "./Contacts.scss";

const Contacts = () => {
  const data = [
    {
      title: "address",
      icon: <FaMapMarkerAlt />,
      desc: "Киев, Оболонский пр, 14Б"
    },
    {
      title: "mail",
      icon: <FaEnvelope />,
      desc: "mail@gmail.com"
    },
    {
      title: "phone",
      icon: <FaPhone />,
      desc: "(055) 555-55-55"
    },
    {
      title: "schedule",
      icon: <FaClock />,
      desc: "Пн-Пт: 09-19, Сб-ВС: 10-18"
    }
  ];

  return (
    <section className="contacts">
      <div className="contacts__inner">
        <div className="contacts__info">
          <img src={logo} alt="logo" className="contacts__logo" />
          <div>
            {data.map(item => {
              return (
                <div className="contacts__info-unit" key={item.title}>
                  <span className="contacts__info-unit-icon">{item.icon}</span>
                  <span key={item.title}>{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="contacts__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1508.8242225705437!2d30.49815745039385!3d50.50570909930367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d35b3676fc77%3A0xd783ef0744b3ee80!2z0J7QsdC80LXQvSDQstCw0LvRjtGC!5e0!3m2!1sru!2sua!4v1579439381235!5m2!1sru!2sua"
            className="contacts__map-iframe"
            frameBorder="0"
            allowFullScreen=""
            title="map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
