
        let dt ="11/06/2023";
        let arr = dt.split("/");
        let newDate = new Date(arr[2], Number((arr[1])-1), arr[0]);

        let tmpDate = new Date(newDate.getDate(), (newDate.getMonth()+5), newDate.getFullYear());

        console.log(tmpDate);