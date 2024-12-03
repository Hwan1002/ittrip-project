package project.map.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;


@RestController
public class DirectionController {
	
	@Value("${naver.api.url}")
    private String apiUrl;					//Directions 15 요청 서버 url	
											//https://naveropenapi.apigw.ntruss.com/map-direction-15
    @Value("${naver.api.key.id}")			//client-id
    private String apiKeyId;

    @Value("${naver.api.key.secret}")		//client-secret
    private String apiKeySecret;

    private final WebClient webClient;
    
    public DirectionController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();		//baseurl 요청 서버 location으로 정해놓기
    }
    
    @GetMapping("/v1/driving")				//baseurl에 포함시키려했으나 권장하지 않는대서 여기에 넣음
    public ResponseEntity<?> getDirections(
            @RequestParam String start,		//127.74645%2C37.64424 형태로 보내야함
            @RequestParam String wayPoints,
            @RequestParam String goal
            		//기본값 trafast
    ){
    	try{
    
        String response = webClient.get()
                .uri(uriBuilder -> uriBuilder		//uri를 빌드(파라미터들,헤더)
                        .queryParam("start", start)
                        .queryParam("wayPoints", wayPoints)
                        .queryParam("goal", goal)
                        .build())
                .header("x-ncp-apigw-api-key-id", apiKeyId)
                .header("x-ncp-apigw-api-key", apiKeySecret)
                .retrieve()
                .bodyToMono(String.class)			//mono (0개 또는 1개) 로 반환
                .block();							//block -> ResponseEntity로 반환하기 위해 씀

        return ResponseEntity.ok(response);
    }catch(Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
    }
}
}
