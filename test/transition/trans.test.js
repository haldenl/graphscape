"use strict";
var expect = require('chai').expect;
var editOpSet = require('../editOpSetForTest');
var trans = require('../../src/transition/trans');
var util = require('../../src/util');
var startVL = {
  "data": { "url": "/data/cars.json" },
  "mark": "area",
  "transform": { "filter": "datum.Year > 1970 " },
  "encoding": {
    "x": { "type": "temporal", "field": "Year", "timeUnit": "year" },
    "y": { "type": "quantitative",
      "field": "*",
      "aggregate": "count"
    },
    "color": { "type": "nominal", "field": "Origin" }
  }
};
var destinationVL = {
  "data": { "url": "/data/cars.json" },
  "mark": "point",
  "encoding": {
    "x": { "type": "quantitative", "field": "Horsepower", "scale": { "type": "log" } },
    "y": {
      "type": "quantitative",
      "field": "Acceleration",
      "scale": { "type": "log" }
    },
    "color": { "type": "ordinal", "field": "Origin" }
  }
};
describe('transition.trans', function () {
  describe('mark edit operation', function () {
    it('should return a mark edit operation correctly.', function () {
      const tr = trans.markEditOps(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS["markEditOps"])[0];
      expect(tr.cost).to.eq(editOpSet.DEFAULT_EDIT_OPS["markEditOps"]["AREA_POINT"].cost);
      expect(tr.name).to.eq("AREA_POINT");
    });
  });
  describe ('transform edit operation', function () {
    const result = trans.transformEditOps(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]);
    it('should return SCALE,AGGREGATE, and SORT editOperations correctly.', function () {
      const scaleTrs = trans.transformBasic(startVL, destinationVL, "y", "SCALE", editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]);
      expect(scaleTrs.cost).to.eq(editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]["SCALE"].cost);
      expect(trans.transformBasic(startVL, destinationVL, "y", "AGGREGATE", editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]).cost).to.eq(editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]["AGGREGATE"].cost);
      expect(trans.transformBasic(startVL, destinationVL, "y", "SORT", editOpSet.DEFAULT_EDIT_OPS["transformEditOps"])).to.eq(undefined);
    });
    it('should return SCALE,AGGREGATE, and SORT editOperations with detail correctly.', function () {
      expect(result[0].detail.length).to.eq(2);
    });
    it('should omit SCALE if omitIncludeRawDomain is true.', function () {
      var testVL = util.duplicate(startVL);
      testVL.encoding.y["scale"] = { includeRawDomain: true };
      var real = trans.transformBasic(startVL, testVL, "y", "SCALE", editOpSet.DEFAULT_EDIT_OPS["transformEditOps"], { omitIncludeRawDomain: true });
      expect(real).to.eq(undefined);
    });
    // YH : Deprecated SETTYPE editOperation
    // it('should return SETTYPE editOperation correctly.', function () {
    //   expect(trans.transformSettype(startVL, destinationVL, "color", editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]).name).to.eq("SETTYPE");
    // });
    it('should return all editOperations without order.', function () {
      expect(result.length).to.eq(3);
    });
    var filterEditOps = {
      "MODIFY_FILTER": editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]["MODIFY_FILTER"],
      "ADD_FILTER": editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]["ADD_FILTER"],
      "REMOVE_FILTER": editOpSet.DEFAULT_EDIT_OPS["transformEditOps"]["REMOVE_FILTER"]
    };
    it('should return ADD_FILTER / REMOVE_FILTER edit operation correctly.', function () {
      var startVL = { "transform": { "filter": "datum.A == 0 && datum.B == 100 && datum.C == 3  " } };
      var destinationVL = { "transform": { "filter": "datum.A == 0 && datum.B == 100 && datum.D == 4" } };
      var sd = trans.filterEditOps(startVL, destinationVL, filterEditOps);
      expect(sd.length).to.eq(2);
      expect(sd[0].name).to.eq("ADD_FILTER");
      expect(sd[0].detail.after[0]).to.eq("D");
      expect(sd[0].detail.after[1]).to.eq("==");
      expect(sd[0].detail.after[2]).to.eq("4");
      expect(sd[1].name).to.eq("REMOVE_FILTER");
      expect(sd[1].detail.before[0]).to.eq("C");
      expect(sd[1].detail.before[1]).to.eq("==");
      expect(sd[1].detail.before[2]).to.eq("3");
    });
    it('should return MODIFY_FILTER  edit operation correctly.', function () {
      var startVL = { "transform": { "filter": "datum.Running_Time_min > 0" } };
      var destinationVL = { "transform": { "filter": "datum.Running_Time_min == 100 && datum.Rotten_Tomato_Rating == 100" } };
      var sd = trans.filterEditOps(startVL, destinationVL, filterEditOps);
      expect(sd[0].name).to.eq("MODIFY_FILTER");
      expect(sd[0].detail.where).to.eq("Running_Time_min");
      expect(sd[0].detail.before[0]+', '+sd[0].detail.after[0]).to.eq(">, ==");
      expect(sd[0].detail.before[1]+', '+sd[0].detail.after[1]).to.eq("0, 100");

      expect(sd[1].name).to.eq("ADD_FILTER");
      expect(sd[1].detail.after[0]).to.eq("Rotten_Tomato_Rating");
      expect(sd[1].detail.after[1]).to.eq("==");
      expect(sd[1].detail.after[2]).to.eq("100");

      startVL = { "transform": { "filter": "datum.A == 0 && datum.B == 100" } };
      destinationVL = { "transform": { "filter": "datum.A != 0 && datum.D == 100" } };
      sd = trans.filterEditOps(startVL, destinationVL, filterEditOps);
      expect(sd[0].name).to.eq("MODIFY_FILTER");
      expect(sd[0].detail.before[0]+', '+sd[0].detail.after[0]).to.eq("==, !=");

      expect(sd[1].name).to.eq("ADD_FILTER");
      expect(sd[1].detail.after[0]).to.eq("D");
      expect(sd[1].detail.after[1]).to.eq("==");
      expect(sd[1].detail.after[2]).to.eq("100");

      expect(sd[2].name).to.eq("REMOVE_FILTER");
      expect(sd[2].detail.before[0]).to.eq("B");
      expect(sd[2].detail.before[1]).to.eq("==");
      expect(sd[2].detail.before[2]).to.eq("100");

    });
    it('should return MODIFY_FILTER  edit operation when filter has Filter objects correctly.', function () {
      const startVL = { "transform": { "filter": { field: "Running_Time_min", range: [0, null] } } };
      const destinationVL = { "transform": { "filter": [{ field: "Running_Time_min", equal: "0" }, { field: "Rotten_Tomato_Rating", equal: "100" }] } };
      var sd = trans.filterEditOps(startVL, destinationVL, filterEditOps);
      expect(sd[0].name).to.eq("MODIFY_FILTER");
      expect(sd[0].detail.before[0]+', '+sd[0].detail.after[0]).to.eq("range, equal");
      expect(sd[0].detail.before[1]+', '+sd[0].detail.after[1]).to.eq('[0,null], 0');

      expect(sd[1].name).to.eq("ADD_FILTER");
      expect(sd[1].detail.after[0]).to.eq("Rotten_Tomato_Rating");
      expect(sd[1].detail.after[1]).to.eq("equal");
      expect(sd[1].detail.after[2]).to.eq("100");

      const startVL2 = { "transform": { "filter": ["datum.A == 0", { field: "B", in: ['red', 'blue'] }] } };
      const destinationVL2 = { "transform": { "filter": "datum.A != 0 && datum.D == 100" } };

      sd = trans.filterEditOps(startVL2, destinationVL2, filterEditOps);
      expect(sd[0].name).to.eq("MODIFY_FILTER");
      expect(sd[0].detail.before[0]+', '+sd[0].detail.after[0]).to.eq("==, !=");

      expect(sd[1].name).to.eq("ADD_FILTER");
      expect(sd[1].detail.after[0]).to.eq("D");
      expect(sd[1].detail.after[1]).to.eq("==");
      expect(sd[1].detail.after[2]).to.eq("100");

      expect(sd[2].name).to.eq("REMOVE_FILTER");
      expect(sd[2].detail.before[0]).to.eq("B");
      expect(sd[2].detail.before[1]).to.eq("in");
      expect(sd[2].detail.before[2]).to.eq('["red","blue"]');
    });
    it('should return FILTER ARITHMETIC edit operation correctly.', function () {
      var startVL = { "transform": { "filter": "datum.Running_Time_min > 0" } };
      var destinationVL = { "transform": { "filter": "datum.Running_Time_min > 10" } };
      expect(trans.filterEditOps(startVL, destinationVL, filterEditOps)[0].name).to.eq("MODIFY_FILTER");
      startVL = { "transform": { "filter": "datum.A == 0 && datum.B == 100 && datum.S !== 1" } };
      destinationVL = { "transform": { "filter": "datum.A == 0 && datum.S !== 1 && datum.B == 100" } };
      expect(trans.filterEditOps(startVL, destinationVL, filterEditOps).length).to.eq(0);
      startVL = { "transform": { "filter": "datum.Running_Time_min > 0" } };
      destinationVL = { "transform": { "filter": "datum.Running_Time_min == 0" } };
      expect(trans.filterEditOps(startVL, destinationVL, filterEditOps)[0].name).to.eq("MODIFY_FILTER");
    });
  });
  describe('encoding edit operation', function () {
    it('should return empty array if start is equal to dest.', function () {
      expect(trans.encodingEditOps(startVL, startVL, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]).length).to.eq(0);
    });
    it('should return all encoding editOperations', function () {
      var source = {
        "data": { "url": "data/cars.json" },
        "mark": "point",
        "encoding": {
          "x": { "field": "Horsepower", "type": "quantitative" }
        }
      };
      var target1 = util.duplicate(source);
      target1.encoding.y = { "field": "Origin", "type": "ordinal" };
      var target2 = util.duplicate(target1);
      delete target2.encoding.x;
      target2.encoding.color = { "field": "Horsepower", "type": "quantitative" };
      var result1 = trans.encodingEditOps(source, target1, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      var result2 = trans.encodingEditOps(source, target2, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      var result3 = trans.encodingEditOps(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);

      expect(result1.length).to.eq(1);
      expect(result1[0].name).to.eq("ADD_Y");
      expect(result2.length).to.eq(2);
      expect(result2[0].name).to.eq("MOVE_X_COLOR");
      expect(result3.length).to.eq(2);

      var destination = {
        "description": "A scatterplot showing horsepower and miles per gallons for various cars.",
        "data": { "url": "data/cars.json" },
        "mark": "point",
        "encoding": {
          "x": { "type": "quantitative", "field": "Acceleration" },
          "y": { "type": "quantitative", "field": "Horsepower" }
        }
      };
      var origin = {
        "description": "A scatterplot showing horsepower and miles per gallons for various cars.",
        "data": { "url": "data/cars.json" },
        "mark": "point",
        "encoding": {
          "x": {
            "type": "quantitative",
            "field": "Acceleration",
            "bin": true
          },
          "y": {
            "type": "quantitative",
            "field": "*",
            "scale": { "type": "log" },
            "aggregate": "count"
          }
        }
      };
      var result4 = trans.encodingEditOps(origin, destination, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      expect(result4.length).to.eq(1);
    });

    it('should return OVER_THE_CEILING if the sum of encoding editOperations exceed OVER_THE_CEILING\'s cost', function () {

      var editOpSetWithCeil = util.duplicate(editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      editOpSetWithCeil["ceiling"] = {"cost": 4.1,"alternatingCost": 5.81}
      this.timeout(500000);
      var startVL = {
        "data": { "url": "data/cars.json" },
        "mark": "line",
        "encoding": {
          "x": { "field": "Year", "type": "temporal", "timeUnit": "year" }
        }
      };
      var destinationVL = {
        "data": { "url": "data/cars.json" },
        "mark": "point",
        "encoding": {
          "x": { "field": "Horsepower", "type": "quantitative", "aggregate": "mean" }

        }
      };
      expect(trans.encodingEditOps(startVL, destinationVL, editOpSetWithCeil)[0].name)
        .to.eq("OVER_THE_CEILING");
    });

    it('should return the correct answer for redundant encodings', function () {
      var source = {
        "encoding": {
          "x": {
            "field": "Major_Genre",
            "type": "nominal",
            "sort": { "op": "mean", "field": "Profit", "order": "descending" }
          },
          "y": {
            "field": "Profit",
            "aggregate": "mean",
            "type": "quantitative"
          }
        }
      };
      var target = util.duplicate(source);
      target.encoding.size = {
        "field": "Profit",
        "aggregate": "stdev",
        "type": "quantitative"
      };
      var result1 = trans.encodingEditOps(source, target, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      expect(result1.length).to.eq(1);
    });
    it('should return all encoding editOperations correctly when nodes are updated during Dijkstra Algorithm.', function () {
      this.timeout(500000);
      var startVL = {
        "data": {
          "url": "data/population.json",
          "formatType": "json"
        },
        "mark": "area",
        "encoding": {
          "column": {
            "field": "year",
            "type": "ordinal"
          },
          "x": {
            "field": "age",
            "type": "ordinal"
          },
          "y": {
            "field": "people",
            "type": "quantitative"
          },
          "color": {
            "field": "sex",
            "type": "nominal"
          }
        }
      };
      var destinationVL = {
        "data": {
          "url": "data/population.json",
          "formatType": "json"
        },
        "mark": "point",
        "encoding": {
          "row": {
            "field": "year",
            "type": "ordinal"
          },
          "x": {
            "field": "age",
            "type": "ordinal"
          },
          "size": {
            "field": "people",
            "type": "quantitative"
          }
        }
      };
      var result = trans.encodingEditOps(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS["encodingEditOps"]);
      expect(result.length).to.eq(3);
    });
  });
  describe('whole editOperation', function () {
    it('should return modified costs for _COUNT type encoding editOperations.', function () {
      var startVL = {
        "mark": "area",
        "encoding": {
          "y": { "type": "quantitative", "field": "A" }
        }
      };
      var destinationVL = {
        "mark": "area",
        "encoding": {
          "x": { "type": "quantitative", "field": "*", "aggregate": "count" },
          "y": { "type": "quantitative", "field": "A", "bin": true }
        }
      };
      var destinationVL2 = {
        "mark": "area",
        "encoding": {
          "x": { "type": "quantitative", "field": "*", "aggregate": "count" },
          "y": { "type": "quantitative", "field": "A", "aggregate": "mean", "bin": true }
        }
      };
      var result = trans.transition(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS);
      var actualCost = editOpSet.DEFAULT_EDIT_OPS.encodingEditOps["ADD_X_COUNT"].cost;
      expect(result.encoding[0].cost).to.eq(actualCost);
      var result2 = trans.transition(startVL, destinationVL2, editOpSet.DEFAULT_EDIT_OPS);
      actualCost = editOpSet.DEFAULT_EDIT_OPS.encodingEditOps["ADD_X_COUNT"].cost + editOpSet.DEFAULT_EDIT_OPS.transformEditOps["AGGREGATE"].cost;
      expect(result2['cost']).to.eq(actualCost);
    });
    it('should return all editOperations correctly.', function () {
      var result = trans.transition(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS);
      expect(result.mark[0].cost).to.eq(editOpSet.DEFAULT_EDIT_OPS["markEditOps"]["AREA_POINT"].cost);
      expect(result.transform.length).to.eq(3);
      expect(result.encoding.length).to.eq(2);
    });
  });
  it('should return modified costs for _COUNT type encoding editOperations.', function () {
    var startVL = {
      "data": { "url": "data/cameras.json" },
      "mark": "bar",
      "transform": {
        "filter": "datum.Storage_included <= 64 && datum.Zoom_wide>0"
      },
      "encoding": {
        "x": { "field": "Price", "type": "quantitative", "bin": true },
        "y": {
          "field": "*",
          "type": "quantitative",
          "aggregate": "count"
        }
      }
    };
    var destinationVL = {
      "data": { "url": "data/cameras.json" },
      "mark": "point",
      "transform": {
        "filter": "datum.Storage_included <= 64 && datum.Zoom_wide>0"
      },
      "encoding": {
        "y": { "field": "Max_resolution", "type": "quantitative" },
        "x": { "field": "Weight", "type": "quantitative" }
      }
    };
    var result = trans.transition(startVL, destinationVL, editOpSet.DEFAULT_EDIT_OPS);

  });
});