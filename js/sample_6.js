var fs    =    require('fs');
var util  =   require('util');
var file    =    "Production-Department_of_Agriculture_and_Cooperation_1.csv";
fs.readFile(file,'utf-8',function(error,data)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        var mycsv=data;
        function csvJSON(mycsv) {
            var lines=mycsv.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            for(var i=1; i<lines.length; i++)
             {
                var obj = {};

                var row = lines[i],
                queryIdx = 0,
                startValueIdx = 0,
                idx = 0;

                if (row.trim() === '')
                 {
                     continue;
                  }

                while (idx < row.length)
                 {
                    var c = row[idx];

                    if (c === '"')
                    {
                        do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
                    }

                    if (c === ',' || idx === row.length - 1)
                     {
                        var value = row.substr(startValueIdx, idx - startValueIdx).trim();
                        // if (value[0] === '"')
                        // {
                        //      value = value.substr(1);
                        // }
                        // if (value[value.length - 1] === ',')
                        // {
                        //      value = value.substr(0, value.length - 1);
                        // }
                        // if (value[value.length - 1] === '"')
                        // {
                        //      value = value.substr(0, value.length - 1);
                        // }

                        var key = headers[queryIdx++];
                        obj[key] = value;
                        startValueIdx = idx + 1;
                     }
                    ++idx;
                }
                if(obj['Particulars'].includes("Agricultural Production Foodgrains") && obj[' 3-2013']!=="NA")
                {
                      var obj_1={};
                      obj_1['Particulars']=obj['Particulars'];
                      obj_1['Production']=obj[' 3-2013'];
                      result.push(obj_1);
                }
            }
            return result.sort(function(a, b) {
            return parseFloat(b['Production']) - parseFloat(a['Production']);
            });
        }
        //console.log(csvJSON(mycsv));
       fs.writeFile("D3input_2.json", JSON.stringify(csvJSON(mycsv)),'utf-8', function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
      });
    }
});
