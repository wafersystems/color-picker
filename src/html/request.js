import fetch from 'isomorphic-fetch';

export const sceneChange = (area, scene) => {
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&p=${scene}`);
};

export const colorChange = (area, channel, color) => { //channel : {r, g, b} ; color: {r, g, b}
  const r = Math.round(color.r / 2.5);
  const g = Math.round(color.g / 2.5);
  const b = Math.round(color.b / 2.5);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.r}&l=${r}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.g}&l=${g}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.b}&l=${b}`);
};

export const temperatureChange = (area, channel, temperature, brightness) => {// temperature angle, brightness angle , channel: {c, w}
  const cool = Math.round(temperature / 3.6);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.c}&l=${Math.round(cool * brightness / 100)}`);
  fetch(`${location.protocol}//${location.host}/SetDyNet.cgi?a=${area}&c=${channel.w}&l=${Math.round((100 - cool) * brightness / 100)}`);
};

export const getUrlParam = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return r[2];
  return null;
};
