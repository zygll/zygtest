export default {

  mutations: {
    // 设置展示列
    SET_COLUMNS: (state, cols) => {
      cols = cols.map(item => item.prop);
      console.log("cols", cols);
      console.log(state.columnsData,'state.columnsData11111');
      for (const item in state.columnsData) {
        console.log(item,'item');
        if (state.columnsData[item].prop) {
          console.log(state.columnsData[item].prop,'state.columnsData[item].prop');
          console.log(cols.indexOf(state.columnsData[item].prop));
          if (cols.indexOf(state.columnsData[item].prop) > -1) {
            state.columnsData[item].show = true
          } else {
            state.columnsData[item].show = false
          }
        }
      }
    },
    // 处理显示列数据
    GET_COLUMS: (state) => {
      const tempCols = []
      for (const item in state.columnsData) {
        if (!state.columnsData[item].columnHidden) {
          if (state.columnsData[item].prop) {
            tempCols.push(state.columnsData[item])
          }
        }
      }
      state.columns = tempCols
    },
    // 处理显示列数据
    SET_DISABLE: (state, obj) => {
      const keys = Object.keys(obj)
      for (const item in state.columnsData) {
        if (state.columnsData[item].prop) {
          if (keys.indexOf(state.columnsData[item].prop) > -1) {
            state.columnsData[item].searchDisable = obj[state.columnsData[item].prop]
          }
        }
      }
    },
    SET_COL_SORT: (state, obj) => {
      console.log("obj.oldIndex,obj.newIndex", obj.sortFrom, obj.newIndex)
      console.log("offset", obj.offset)
      let tempIndex = obj.newIndex - obj.offset
      let hiddenOffset = 0
      // 循环遍历计算隐藏列数量
      state.columnsData.forEach(col => {
        if (tempIndex > 0) {
          if (col.show) {
            tempIndex--
          } else {
            hiddenOffset++
          }
        }
      })
      console.log("hidden index", tempIndex)
      console.log("hidden hiddenOffset", hiddenOffset)
      const oldItem = state.columnsData[obj.sortFrom]
      state.columnsData.splice(obj.sortFrom, 1)

      console.log("state.columnsData:,", JSON.stringify(oldItem))
      // 计算整理偏移量赋值
      state.columnsData.splice(obj.newIndex - obj.offset + hiddenOffset, 0, oldItem)

      let sortCol = []
      for (const item of state.columnsData) {
        sortCol.push(item.prop)
      }
      console.log("sortCol", sortCol)
      sessionStorage.setItem(obj.tableName, JSON.stringify(sortCol))
    }
  },
  actions: {
    changeColSort({ commit }, obj) {
      return new Promise((resolve, reject) => {
        console.log(reject);
        commit("SET_COL_SORT", obj)
        resolve(true)
      })
    },
    // 处理列信息disable
    setDisableCols({
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        console.log(reject);
        commit("SET_DISABLE", obj)
        resolve(true)
      })
    },
    // 处理列展示数据
    setColumns({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        console.log(reject);
        commit("SET_COLUMNS", data)
        commit("GET_COLUMS")
        console.log("state.columns", state.columns);
        resolve(state.columns)
        // resolve(state.columnsData)
      })
    },
    getColumns({
      commit,
      dispatch, state, rootState
    }, tableName) {
      // session 获取列选择缓存
      const colSessionData = sessionStorage.getItem(tableName)
      console.log("colSessionData", colSessionData);
      if (colSessionData) {
        commit("SET_COLUMNS", colSessionData)
      }
      commit("GET_COLUMS")
      state.columnsData = state.columnsData.filter(item => {
        if (item.type != "operation") {
          return true
        } else {
          return false
        }
      })
      let colSessionSort = localStorage.getItem(tableName + "Sort")
      if (colSessionSort) {
        colSessionSort = JSON.parse(colSessionSort)
        console.log(colSessionSort)
        let diySort = (a, b) => {
          if (colSessionSort.indexOf(b.prop) > -1) {
            return (
              colSessionSort.indexOf(a.prop) - colSessionSort.indexOf(b.prop)
            )
          } else {
            return -1
          }
        }

        state.columnsData.sort(diySort)
        console.log(state.columnsData)
      }
      const optionInit = []
      for (const column of state.columnsData) {
        if (column.type == "select") {
          if (typeof column.optionApi === "function") {
            optionInit.push(column.optionApi().then(res => {
              dispatch("setOption", { optionName: column.optionName, options: res }, { root: true })
            }))
          } else {
            optionInit.push(dispatch("options/optionInit", { optionName: column.optionName, optionCache: column.optionCache }, { root: true }))
          }
        }
      }
      return Promise.all(optionInit)
        .then(() => {
          for (const item of state.columnsData) {
            if (item.type == "select") {
              item.options = rootState.options[item.optionName]
            }
          }
        })
    }
  }
}
