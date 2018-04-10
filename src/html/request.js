import fetch from 'isomorphic-fetch';

export const sceneChange = (area, scene) => {
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&p=${scene}`);
};

export const colorChange = (area, channel, color) => { //channel : {r, g, b} ; color: {r, g, b}
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.r}&l=${color.r}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.g}&l=${color.g}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.b}&l=${color.b}`);
};

export const temperatureChange = (area, channel, temperature, brightness) => {// temperature angle, brightness angle , channel: {c, w}
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.c}&l=${Math.round(temperature.cw * brightness)}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.w}&l=${Math.round((1 - temperature.cw) * brightness)}`);
};
export const brightnessChange = (area, channel, brightness) => {// temperature angle, brightness angle , channel: {c, w}
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel}&l=${brightness}`);
};

export const getUrlParam = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return r[2];
  return null;
};

export const getSwitch = (area) => {
  return fetch(`${location.protocol}//${location.host}/GetDyNet.cgi?a=${area}`);
};

export const getAreaForBar = () => {
  return fetch('/data/config.json');
};
