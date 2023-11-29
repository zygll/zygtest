<template>
    <div>
      <div v-for="(item, index) in arr" :key="index">
        <h2>{{ item.value }}</h2>
        <ul>
          <li v-for="(data, i) in item.tableData" :key="i">
            <a :href="data.fileUrl">{{ data.fileName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        arr: [
          {
            key: "CHART",
            value: "一图三表"
          },
          {
            key: "OTHER",
            value: "其他"
          }
        ],
        tableData: [
          {
            bizId: "1636623776779960320",
            bizSubType: "OTHER",
            createdDate: 1686192105511,
            createdUserName: "廖亮",
            fileName: "评审表1 (3).png",
            fileType: "PNG",
            fileUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038410&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=MzFjYzhkNzc0OTgwZGMwNTVhMjc1NjMwNTZhMmUyODE=",
            id: "1666636602870468608",
            previewUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038410&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=MzFjYzhkNzc0OTgwZGMwNTVhMjc1NjMwNTZhMmUyODE="
          },
          {
            bizId: "1636623776779960320",
            bizSubType: "CHART",
            createdDate: 1686192109355,
            createdUserName: "廖亮",
            fileName: "评审表1 (2).png",
            fileType: "PNG",
            fileUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038415&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=Njc2YWUxNmYyMTcyOGM3OTM4YTNhMzE5YjkxMDY4YjU=",
            id: "1666636618984984576",
            previewUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038415&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=Njc2YWUxNmYyMTcyOGM3OTM4YTNhMzE5YjkxMDY4YjU="
          },
          {
            bizId: "1636623776779960320",
            bizSubType: "CHART",
            createdDate: 1686192114629,
            createdUserName: "廖亮",
            fileName: "评审表1 (1).png",
            fileType: "PNG",
            fileUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038412&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=N2E4OTcxMDVhYjlkYzY1Y2Y0YzAzYzM3MGQ1NzkzZWM=",
            id: "1666636641143492608",
            previewUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038412&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=N2E4OTcxMDVhYjlkYzY1Y2Y0YzAzYzM3MGQ1NzkzZWM="
          },
          {
            bizId: "1636623776779960320",
            bizSubType: "OTHER",
            createdDate: 1686192181414,
            createdUserName: "廖亮",
            fileName: "dc.png",
            fileType: "PNG",
            fileUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038416&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=NGFiYTI3YzZkMTFjMTJjM2ZjZjY0MzI0M2VjNjQxNDE=",
            id: "1666636921222336512",
            previewUrl:
              "https://inte-apppan.vanke.com//api.action?acmod=downloadcommfile&id=21200038416&revision=0&apikey=e9d003dcb96499379c7418e618fbcd51&usid=fbd672e88c900f26a0221af266cd22ba-null-attachment&f_token=NGFiYTI3YzZkMTFjMTJjM2ZjZjY0MzI0M2VjNjQxNDE="
          }
        ]
      };
    }
  };
  </script>