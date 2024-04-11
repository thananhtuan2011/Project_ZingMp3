
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BE_Music.Models.BaseModel
{
    public class BaseModel
    {
        public int status { get; set; }
        public object data { get; set; }
        public Panigator panigator { get; set; }
        public ErrorModel error { get; set; }

        public ErrorModel GetStatus()
        {
            if (status == 1)
                return new ErrorModel { Code = 0, Msg = "" };
            return new ErrorModel { Code = 0, Msg = "" };
        }
    }

    public class Panigator
    {
        [JsonPropertyName("total")]
        [JsonProperty("total")]
        public int TotalItems { get; set; }

        [JsonPropertyName("totalpage")]
        [JsonProperty("totalpage")]
        public int TotalPage { get; set; }

        [JsonPropertyName("page")]
        [JsonProperty("page")]
        public int PageIndex { get; set; }

        [JsonPropertyName("pageSize")]
        [JsonProperty("pageSize")]
        public int PageSize { get; set; }

        [JsonPropertyName("pageSizes")]
        [JsonProperty("pageSizes")]
        public List<int> PageSizes { get; set; }

        public Panigator()
        {

        }

        public Panigator(int p_PageIndex, int p_PageSize, int p_TotalRows)
        {
            PageIndex = p_PageIndex;
            PageSize = p_PageSize;
            TotalItems = p_TotalRows;
            TotalPage = int.Parse(Math.Ceiling((double)TotalItems / PageSize).ToString());
            PageSizes = Enumerable.Range(1, TotalPage).Select(x => x).ToList();
        }

    }

    public class ErrorModel
    {
        [JsonPropertyName("code")]
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonPropertyName("msg")]
        [JsonProperty("msg")]
        public string Msg { get; set; }



        public ErrorModel()
        {

        }
    }


    public class QueryRequestParams
    {
        [JsonPropertyName("filter")]//for derelize of NEWTON.JSON
        [JsonProperty("filter")]//for serilize of NEWTON.JSON
        public Dictionary<string, string> Filter { get; set; }

        [JsonPropertyName("paginator")]
        [JsonProperty("paginator")]
        public Panigator Panigator { get; set; }

        [JsonPropertyName("searchTerm")]
        [JsonProperty("searchTerm")]
        public string SearchValue { get; set; }

        [JsonPropertyName("sorting")]
        [JsonProperty("sorting")]
        public SortParams Sort { get; set; }
    }

    public class SortParams
    {
        [JsonPropertyName("column")]
        [JsonProperty("column")]
        public string ColumnName { get; set; }

        [JsonPropertyName("direction")]
        [JsonProperty("direction")]
        public string Direction { get; set; }
    }

    public class RequestGetValueById
    {
        /// <summary>
        /// use for delete or get detail of single item
        /// </summary>
        [JsonPropertyName("htid")]
        [JsonProperty("htid")]
        public int IdKey { get; set; }

        /// <summary>
        /// use for delete of multiple items
        /// </summary>
        [JsonPropertyName("htids")]
        [JsonProperty("htids")]
        public List<int> IdKeys { get; set; }
    }

    public class ImageInfo
    {
        public int TypeFile { get; set; }
        public string LinkFile { get; set; }
        public string NameFile { get; set; }
    }
 
}
