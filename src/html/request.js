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
