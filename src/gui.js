import {compositions, layerOptions, options, palettes} from "./config";
import * as dev from "fxhash_lib/dev";
import {layers, debug} from "./vars";

export const createGUI = (gui) => {
    gui.remember(options);
    const onChange = () => {
        debug.visible = options.showDebug;
    }

    const folder = gui.addFolder('Options');
    folder.add(options, 'minLayers', 1, 5, 1);
    folder.add(options, 'maxLayers', 1, 5, 1);
    folder.add(options, 'minStrokes', 1, 22, 1);
    folder.add(options, 'maxStrokes', 1, 22, 1);
    folder.add(options, 'strokesRel', ['same', 'mirror', 'mirrorX', 'mirrorY', 'mirrorRand', 'random']);
    folder.add(options, 'maxCells', 5, 20, 1);
    folder.add(options, 'minSpeed', 0.001, 0.01, 0.001).listen();
    folder.add(options, 'maxSpeed', 0.01, 0.1, 0.001).listen();
    folder.add(options, 'speedMult', 0.1, 10, 0.1).listen();
    folder.add(options, 'maxIterations', 1, 20, 1);
    folder.add(options, 'showDebug').onChange(onChange);

    dev.createCheckBoxGui(compositions, 'Compositions');
    dev.createCheckBoxGui(palettes, 'Palettes');
}

export const createLayerGUI = (gui, i) => {
    const folder = gui.addFolder('Layer '+i);
    const updateLayer = () => {
        layers[i].mesh.visible = layerOptions[i].visible;
        layers[i].setOptions(layerOptions[i]);
        resetLayers();
    }
    const resetLayers = () => {
        for (let i=0; i<layers.length; i++) {
            layers[i].reset();
        }
    }
    folder.add(layerOptions[i], 'visible', 0, 5, 1).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'blendModePass', 0, 5, 1).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'blendModeView', 2, 5, 1).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'dt', 0, 1, 0.01).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'K', 0, 1, 0.01).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'nu', 0, 1, 0.01).listen().onChange(updateLayer);
    folder.add(layerOptions[i], 'kappa', 0, 1, 0.01).listen().onChange(updateLayer);
}