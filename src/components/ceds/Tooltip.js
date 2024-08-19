export const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "10px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.width = "400px";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const generateBodyText = (fields, tableRoot, tooltip) => {
  const header = document.createElement("div");
  const geo = document.createElement("h1");
  geo.style.marginTop = "10px";
  geo.style.fontWeight = "lighter";
  geo.textContent = fields[1].toUpperCase();
  header.appendChild(geo);
  tooltip.body.push(header);

  const body = document.createElement("div");
  body.style.display = "flex";
  body.style.flexWrap = "wrap";

  const sectorColor = document.createElement("span");
  sectorColor.style.flex = "1 0";
  sectorColor.style.height = "1rem";
  sectorColor.style.width = "1rem";
  sectorColor.style.borderWidth = "2px";
  sectorColor.style.marginRight = "0.5rem";
  sectorColor.style.marginTop = "0.2rem";
  sectorColor.style.backgroundColor = fields[0].backgroundColor;
  sectorColor.style.borderColor = fields[0].borderColor;
  body.appendChild(sectorColor);

  const sector = document.createElement("div");
  sector.style.flexBasis = "calc(100% - 1.5rem)";
  sector.style.fontWeight = "bold";
  sector.innerHTML += fields[2];
  body.appendChild(sector);

  const fieldNames = document.createElement("div");
  fieldNames.style.marginLeft = "1.5rem";
  fieldNames.style.flexBasis = "calc(80% - 1.5rem)";
  const naics = document.createElement("div");
  naics.textContent = "NAICS Code:";
  const employment = document.createElement("div");
  employment.textContent = "Employment:";
  const lq = document.createElement("div");
  lq.textContent = "LQ:";
  const automation = document.createElement("div");
  automation.textContent = "Automation Weight:";
  const telework = document.createElement("div");
  telework.textContent = "Telework Score:";
  [employment, lq, naics, automation, telework].map((field) =>
    fieldNames.appendChild(field)
  );
  body.appendChild(fieldNames);

  const fieldValues = document.createElement("div");
  fieldValues.style.flexBasis = "20%";
  fieldValues.style.textAlign = "right";
  fields.slice(3).map((item) => {
    const value = document.createElement("div");
    value.textContent = item;
    fieldValues.appendChild(value);
  });
  body.appendChild(fieldValues);

  // Add new children
  tableRoot.appendChild(header);
  tableRoot.appendChild(body);
};