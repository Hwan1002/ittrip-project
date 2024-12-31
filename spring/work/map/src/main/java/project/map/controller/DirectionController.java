package project.map.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import project.map.dto.DirectionsResponseDTO;

@RestController
public class DirectionController {

	private String apiUrl = "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving";
																								
//	@Value("${naver.api.key.id}") 
	private String apiKeyId= "wz3pjcepky";

//	@Value("${naver.api.key.secret}")
	private String apiKeySecret="d21JDzBXMkx7E6P5KQJ0qyPf3W4jfj2e4lRZMgzQ";

	private final WebClient webClient;

	public DirectionController(WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder.baseUrl(apiUrl).build(); 
	}

	@GetMapping("/directions/nowaypoint")
	public ResponseEntity<?> getDirectionsNoWayPoint(
			@RequestParam(name = "start") String start, 																					
			@RequestParam(name = "goal") String goal
	) { 
		try {

			DirectionsResponseDTO response = webClient.get().uri(uriBuilder -> uriBuilder 
					.queryParam("start", start)
					.queryParam("goal", goal).build()).header("x-ncp-apigw-api-key-id", apiKeyId)
					.header("x-ncp-apigw-api-key", apiKeySecret).retrieve().bodyToMono(DirectionsResponseDTO.class)
					.block(); 
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/directions/withwaypoint") 
	public ResponseEntity<?> getDirectionsWithWayPoints(
			@RequestParam(name = "start") String start,
			@RequestParam(name = "waypoints") String wayPoints,
			@RequestParam(name = "goal") String goal
	) {
		try {
			DirectionsResponseDTO response = webClient.get().uri(uriBuilder -> uriBuilder 
					.queryParam("start", start).queryParam("waypoints", wayPoints).queryParam("goal", goal).build())
					.header("x-ncp-apigw-api-key-id", apiKeyId).header("x-ncp-apigw-api-key", apiKeySecret).retrieve()
					.bodyToMono(DirectionsResponseDTO.class)
					.block();
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
		}
	}

}

