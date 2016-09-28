exports.DEFAULT_TRANSITIONS = {"marktypeTransitions":{"AREA_BAR":{"name":"AREA_BAR","cost":0.03},"AREA_LINE":{"name":"AREA_LINE","cost":0.02},"AREA_POINT":{"name":"AREA_POINT","cost":0.04},"AREA_TEXT":{"name":"AREA_TEXT","cost":0.08},"AREA_TICK":{"name":"AREA_TICK","cost":0.04},"BAR_LINE":{"name":"BAR_LINE","cost":0.04},"BAR_POINT":{"name":"BAR_POINT","cost":0.02},"BAR_TEXT":{"name":"BAR_TEXT","cost":0.06},"BAR_TICK":{"name":"BAR_TICK","cost":0.02},"LINE_POINT":{"name":"LINE_POINT","cost":0.03},"LINE_TEXT":{"name":"LINE_TEXT","cost":0.07},"LINE_TICK":{"name":"LINE_TICK","cost":0.03},"POINT_TEXT":{"name":"POINT_TEXT","cost":0.05},"POINT_TICK":{"name":"POINT_TICK","cost":0.01},"TEXT_TICK":{"name":"TEXT_TICK","cost":0.05}},"transformTransitions":{"SCALE":{"name":"SCALE","cost":0.6},"SORT":{"name":"SORT","cost":0.61},"BIN":{"name":"BIN","cost":0.62},"AGGREGATE":{"name":"AGGREGATE","cost":0.63},"ADD_FILTER":{"name":"ADD_FILTER","cost":0.65},"REMOVE_FILTER":{"name":"REMOVE_FILTER","cost":0.65},"MODIFY_FILTER":{"name":"MODIFY_FILTER","cost":0.64}},"encodingTransitions":{"ADD_X":{"name":"ADD_X","cost":4.59},"ADD_Y":{"name":"ADD_Y","cost":4.59},"ADD_COLOR":{"name":"ADD_COLOR","cost":4.55},"ADD_SHAPE":{"name":"ADD_SHAPE","cost":4.51},"ADD_SIZE":{"name":"ADD_SIZE","cost":4.53},"ADD_ROW":{"name":"ADD_ROW","cost":4.57},"ADD_COLUMN":{"name":"ADD_COLUMN","cost":4.57},"ADD_TEXT":{"name":"ADD_TEXT","cost":4.49},"ADD_X_COUNT":{"name":"ADD_X_COUNT","cost":4.58},"ADD_Y_COUNT":{"name":"ADD_Y_COUNT","cost":4.58},"ADD_COLOR_COUNT":{"name":"ADD_COLOR_COUNT","cost":4.54},"ADD_SHAPE_COUNT":{"name":"ADD_SHAPE_COUNT","cost":4.5},"ADD_SIZE_COUNT":{"name":"ADD_SIZE_COUNT","cost":4.52},"ADD_ROW_COUNT":{"name":"ADD_ROW_COUNT","cost":4.56},"ADD_COLUMN_COUNT":{"name":"ADD_COLUMN_COUNT","cost":4.56},"ADD_TEXT_COUNT":{"name":"ADD_TEXT_COUNT","cost":4.48},"REMOVE_X_COUNT":{"name":"REMOVE_X_COUNT","cost":4.58},"REMOVE_Y_COUNT":{"name":"REMOVE_Y_COUNT","cost":4.58},"REMOVE_COLOR_COUNT":{"name":"REMOVE_COLOR_COUNT","cost":4.54},"REMOVE_SHAPE_COUNT":{"name":"REMOVE_SHAPE_COUNT","cost":4.5},"REMOVE_SIZE_COUNT":{"name":"REMOVE_SIZE_COUNT","cost":4.52},"REMOVE_ROW_COUNT":{"name":"REMOVE_ROW_COUNT","cost":4.56},"REMOVE_COLUMN_COUNT":{"name":"REMOVE_COLUMN_COUNT","cost":4.56},"REMOVE_TEXT_COUNT":{"name":"REMOVE_TEXT_COUNT","cost":4.48},"REMOVE_X":{"name":"REMOVE_X","cost":4.59},"REMOVE_Y":{"name":"REMOVE_Y","cost":4.59},"REMOVE_COLOR":{"name":"REMOVE_COLOR","cost":4.55},"REMOVE_SHAPE":{"name":"REMOVE_SHAPE","cost":4.51},"REMOVE_SIZE":{"name":"REMOVE_SIZE","cost":4.53},"REMOVE_ROW":{"name":"REMOVE_ROW","cost":4.57},"REMOVE_COLUMN":{"name":"REMOVE_COLUMN","cost":4.57},"REMOVE_TEXT":{"name":"REMOVE_TEXT","cost":4.49},"MODIFY_X":{"name":"MODIFY_X","cost":4.71},"MODIFY_Y":{"name":"MODIFY_Y","cost":4.71},"MODIFY_COLOR":{"name":"MODIFY_COLOR","cost":4.67},"MODIFY_SHAPE":{"name":"MODIFY_SHAPE","cost":4.63},"MODIFY_SIZE":{"name":"MODIFY_SIZE","cost":4.65},"MODIFY_ROW":{"name":"MODIFY_ROW","cost":4.69},"MODIFY_COLUMN":{"name":"MODIFY_COLUMN","cost":4.69},"MODIFY_TEXT":{"name":"MODIFY_TEXT","cost":4.61},"MODIFY_X_ADD_COUNT":{"name":"MODIFY_X_ADD_COUNT","cost":4.7},"MODIFY_Y_ADD_COUNT":{"name":"MODIFY_Y_ADD_COUNT","cost":4.7},"MODIFY_COLOR_ADD_COUNT":{"name":"MODIFY_COLOR_ADD_COUNT","cost":4.66},"MODIFY_SHAPE_ADD_COUNT":{"name":"MODIFY_SHAPE_ADD_COUNT","cost":4.62},"MODIFY_SIZE_ADD_COUNT":{"name":"MODIFY_SIZE_ADD_COUNT","cost":4.64},"MODIFY_ROW_ADD_COUNT":{"name":"MODIFY_ROW_ADD_COUNT","cost":4.68},"MODIFY_COLUMN_ADD_COUNT":{"name":"MODIFY_COLUMN_ADD_COUNT","cost":4.68},"MODIFY_TEXT_ADD_COUNT":{"name":"MODIFY_TEXT_ADD_COUNT","cost":4.6},"MODIFY_X_REMOVE_COUNT":{"name":"MODIFY_X_REMOVE_COUNT","cost":4.7},"MODIFY_Y_REMOVE_COUNT":{"name":"MODIFY_Y_REMOVE_COUNT","cost":4.7},"MODIFY_COLOR_REMOVE_COUNT":{"name":"MODIFY_COLOR_REMOVE_COUNT","cost":4.66},"MODIFY_SHAPE_REMOVE_COUNT":{"name":"MODIFY_SHAPE_REMOVE_COUNT","cost":4.62},"MODIFY_SIZE_REMOVE_COUNT":{"name":"MODIFY_SIZE_REMOVE_COUNT","cost":4.64},"MODIFY_ROW_REMOVE_COUNT":{"name":"MODIFY_ROW_REMOVE_COUNT","cost":4.68},"MODIFY_COLUMN_REMOVE_COUNT":{"name":"MODIFY_COLUMN_REMOVE_COUNT","cost":4.68},"MODIFY_TEXT_REMOVE_COUNT":{"name":"MODIFY_TEXT_REMOVE_COUNT","cost":4.6},"MOVE_X_ROW":{"name":"MOVE_X_ROW","cost":4.45},"MOVE_X_COLUMN":{"name":"MOVE_X_COLUMN","cost":4.43},"MOVE_X_SIZE":{"name":"MOVE_X_SIZE","cost":4.46},"MOVE_X_SHAPE":{"name":"MOVE_X_SHAPE","cost":4.46},"MOVE_X_COLOR":{"name":"MOVE_X_COLOR","cost":4.46},"MOVE_X_Y":{"name":"MOVE_X_Y","cost":4.44},"MOVE_X_TEXT":{"name":"MOVE_X_TEXT","cost":4.46},"MOVE_Y_ROW":{"name":"MOVE_Y_ROW","cost":4.43},"MOVE_Y_COLUMN":{"name":"MOVE_Y_COLUMN","cost":4.45},"MOVE_Y_SIZE":{"name":"MOVE_Y_SIZE","cost":4.46},"MOVE_Y_SHAPE":{"name":"MOVE_Y_SHAPE","cost":4.46},"MOVE_Y_COLOR":{"name":"MOVE_Y_COLOR","cost":4.46},"MOVE_Y_X":{"name":"MOVE_Y_X","cost":4.44},"MOVE_Y_TEXT":{"name":"MOVE_Y_TEXT","cost":4.46},"MOVE_COLOR_ROW":{"name":"MOVE_COLOR_ROW","cost":4.47},"MOVE_COLOR_COLUMN":{"name":"MOVE_COLOR_COLUMN","cost":4.47},"MOVE_COLOR_SIZE":{"name":"MOVE_COLOR_SIZE","cost":4.43},"MOVE_COLOR_SHAPE":{"name":"MOVE_COLOR_SHAPE","cost":4.43},"MOVE_COLOR_Y":{"name":"MOVE_COLOR_Y","cost":4.46},"MOVE_COLOR_X":{"name":"MOVE_COLOR_X","cost":4.46},"MOVE_COLOR_TEXT":{"name":"MOVE_COLOR_TEXT","cost":4.43},"MOVE_SHAPE_ROW":{"name":"MOVE_SHAPE_ROW","cost":4.47},"MOVE_SHAPE_COLUMN":{"name":"MOVE_SHAPE_COLUMN","cost":4.47},"MOVE_SHAPE_SIZE":{"name":"MOVE_SHAPE_SIZE","cost":4.43},"MOVE_SHAPE_COLOR":{"name":"MOVE_SHAPE_COLOR","cost":4.43},"MOVE_SHAPE_Y":{"name":"MOVE_SHAPE_Y","cost":4.46},"MOVE_SHAPE_X":{"name":"MOVE_SHAPE_X","cost":4.46},"MOVE_SHAPE_TEXT":{"name":"MOVE_SHAPE_TEXT","cost":4.43},"MOVE_SIZE_ROW":{"name":"MOVE_SIZE_ROW","cost":4.47},"MOVE_SIZE_COLUMN":{"name":"MOVE_SIZE_COLUMN","cost":4.47},"MOVE_SIZE_SHAPE":{"name":"MOVE_SIZE_SHAPE","cost":4.43},"MOVE_SIZE_COLOR":{"name":"MOVE_SIZE_COLOR","cost":4.43},"MOVE_SIZE_Y":{"name":"MOVE_SIZE_Y","cost":4.46},"MOVE_SIZE_X":{"name":"MOVE_SIZE_X","cost":4.46},"MOVE_SIZE_TEXT":{"name":"MOVE_SIZE_TEXT","cost":4.43},"MOVE_TEXT_ROW":{"name":"MOVE_TEXT_ROW","cost":4.47},"MOVE_TEXT_COLUMN":{"name":"MOVE_TEXT_COLUMN","cost":4.47},"MOVE_TEXT_SHAPE":{"name":"MOVE_TEXT_SHAPE","cost":4.43},"MOVE_TEXT_COLOR":{"name":"MOVE_TEXT_COLOR","cost":4.43},"MOVE_TEXT_Y":{"name":"MOVE_TEXT_Y","cost":4.46},"MOVE_TEXT_X":{"name":"MOVE_TEXT_X","cost":4.46},"MOVE_TEXT_SIZE":{"name":"MOVE_TEXT_SIZE","cost":4.43},"MOVE_COLUMN_ROW":{"name":"MOVE_COLUMN_ROW","cost":4.44},"MOVE_COLUMN_SIZE":{"name":"MOVE_COLUMN_SIZE","cost":4.47},"MOVE_COLUMN_SHAPE":{"name":"MOVE_COLUMN_SHAPE","cost":4.47},"MOVE_COLUMN_COLOR":{"name":"MOVE_COLUMN_COLOR","cost":4.47},"MOVE_COLUMN_Y":{"name":"MOVE_COLUMN_Y","cost":4.45},"MOVE_COLUMN_X":{"name":"MOVE_COLUMN_X","cost":4.43},"MOVE_COLUMN_TEXT":{"name":"MOVE_COLUMN_TEXT","cost":4.47},"MOVE_ROW_COLUMN":{"name":"MOVE_ROW_COLUMN","cost":4.44},"MOVE_ROW_SIZE":{"name":"MOVE_ROW_SIZE","cost":4.47},"MOVE_ROW_SHAPE":{"name":"MOVE_ROW_SHAPE","cost":4.47},"MOVE_ROW_COLOR":{"name":"MOVE_ROW_COLOR","cost":4.47},"MOVE_ROW_Y":{"name":"MOVE_ROW_Y","cost":4.43},"MOVE_ROW_X":{"name":"MOVE_ROW_X","cost":4.45},"MOVE_ROW_TEXT":{"name":"MOVE_ROW_TEXT","cost":4.47},"SWAP_X_Y":{"name":"SWAP_X_Y","cost":4.42},"SWAP_ROW_COLUMN":{"name":"SWAP_ROW_COLUMN","cost":4.41},"ceiling":{"cost":47.1,"alternatingCost":51.81}}}