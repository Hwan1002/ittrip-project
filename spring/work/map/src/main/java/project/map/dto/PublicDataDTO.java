package project.map.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PublicDataDTO {

    private Response response;

    @Data
    public static class Response {
        private Header header;
        private Body body;
    }

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Body {
        private Items items; // items가 배열 또는 객체 모두 처리 가능
    }

    @Data
    public static class Items {
        private List<Item> item; // items가 배열 또는 객체 모두 처리 가능
    }
    
    @Data
    public static class Item {
        @JsonProperty("rlteTatsNm")
        private String rlteTatsNm;

        @JsonProperty("rlteBsicAdres")
        private String rlteBsicAdres;

        @JsonProperty("rlteCtgryLclsNm")
        private String rlteCtgryLclsNm;
    }
}
