package project.map.controller;


	import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

	import org.springframework.http.MediaType;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.bind.annotation.RestController;
	import org.springframework.web.reactive.function.client.WebClient;
	import org.springframework.web.util.UriComponentsBuilder;

import project.map.dto.DirectionsResponseDTO;
import project.map.dto.LocalSearchResponseDTO;
import project.map.dto.PublicDataDTO;

	@RestController
	public class LocalSearchController {

	    private final WebClient webClient;

	    private String clientId = "W6CdC7Ve_M1MNfFS59NB";
	    private String clientSecret = "mBOfqeLoh3";
	    
	    public LocalSearchController(WebClient webClient) {
	        this.webClient = webClient;
	    }

	    @GetMapping("/local")
	    public ResponseEntity<?> getLocalData (@RequestParam(name = "query") String query){
	    	 
	        try {
	            LocalSearchResponseDTO response = webClient.get()
	                    .uri(uriBuilder -> uriBuilder		//uri를 빌드(파라미터들,헤더)
	                            .queryParam("query", query)
	                            .queryParam("display", 5)
	                            .queryParam("sort", "random")
	                            .build())
	                    .header("X-Naver-Client-Id", clientId)
	                    .header("X-Naver-Client-Secret", clientSecret)
	                    .retrieve()
	                    .bodyToMono(LocalSearchResponseDTO.class)			//mono (0개 또는 1개) 로 반환
	                    .block();							

	            return ResponseEntity.ok(response);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
	        }
	    }
	}