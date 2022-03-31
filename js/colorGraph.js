const displayColorVal = (e) => {
  const target = e.currentTarget;
  target.labels[0].innerHTML = target.value;
  showColor();
};

const showColor = () => {
  const graph = document.getElementsByClassName('graphContentCont')[0];
  const data = getColorData();
  graph.style.backgroundColor = `rgb(${data[0]} ${data[1]} ${data[2]})`;
  document.documentElement.style.setProperty('--inverted-color', `rgb(${255 - data[0]} ${255 - data[1]} ${255 - data[2]})`);

  scene.children[2].userData.sprites.forEach(sprite => {
    const sF = (1*data[0] + 1*data[1] + 1*data[2])/(255*3) + 0.4; //normalised sizeFactor + 1/10
    sprite.material.color.setRGB(data[0]/255, data[1]/255, data[2]/255);
    sprite.scale.set(1*sF, 1*sF, 5*sF/112); // smallest: [0.4, 0.4, 1/56]
  });
};

const getColorData = () => {
  const colorData = [];
  const ranges = document.getElementsByClassName('dataRange');
  for (let i=0; i<ranges.length; i++) {
    colorData.push(ranges[i].value);
  };
  return colorData;
};

const colors = ["R", "G", "B"];

const createColorGraphReact = () => {
  return e('div', {key: keyCounter(), className: "graphCont", style: {zIndex: 2}}, [
    e('div', {key: keyCounter(), className: "graphTitleCont"}, "Mix the colours!"),
    e('div', {key: keyCounter(), className: "yLabelCont"}, null),
    e('div', {key: keyCounter(), className: "xLabelCont"}, null),
    e('div', {key: keyCounter(), className: "graphContentCont"}, [
      colors.map(color => e('div', {key: keyCounter(), className: "dataColumn"}, [
	e('div', {key: keyCounter(), className: "dataLabel"}, color),
	e('div', {key: keyCounter(), className: "dataCont"}, [
	  e('label', {key: keyCounter(), className: "dataValue", htmlFor: `${color}in`}, "0"),
	  e('input', {key: keyCounter(), className: "dataRange", id: `${color}in`, type: "range", min: "0", max: "255", onInput: displayColorVal})
	])
      ]))
    ])
  ])
};