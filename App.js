import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Container,
  Button,
  Input,
  AspectRatio,
  Image,
} from "native-base";
import { Keyboard } from "react-native";

const API =
  "http://api.weatherstack.com/current?access_key=0858e1a2abbb73a34d3ad1d0cb75a533&query=";

export default function App() {
  const [city, setCity] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const temperature = currentTime?.current?.temperature;
  const weatherDescription = currentTime?.current?.weather_descriptions?.[0];
  const icon = currentTime?.current?.weather_icons?.[0];
  const location = currentTime?.location?.name;

  async function handleSearch() {
    Keyboard.dismiss();
    setIsLoading(true);
    const res = await axios.get(API + city);
    setIsLoading(false);

    if (res.data.success === false) {
      setError(res.data?.error?.info);
    } else {
      setError(null);
      setCurrentTime(res.data);
    }
  }
  return (
    <NativeBaseProvider>
      <Center safeArea bg="blue.400" flex={1} justifyContent="flex-start">
        <VStack space="3" w="90%" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            ¿Cómo está el tiempo?
          </Text>
          <Input
            value={city}
            onChangeText={setCity}
            placeholder="Ciudad"
            bg="white"
            borderRadius="xl"
            height={10}
            _focus={{
              bg: "white",
            }}
            onSubmitEditing={handleSearch}
          />
          <Button
            isLoading={isLoading}
            isLoadingText="Buscando"
            onPress={handleSearch}
            w="140"
            bg="red.600"
            rounded="xl"
          >
            Buscar
          </Button>

          {error && (
            <Box
              w="100%"
              p="3"
              bg="danger.500"
              _text={{
                color: "white",
              }}
            >
              {error}
            </Box>
          )}
          {currentTime?.current && (
            <AspectRatio
              width="100%"
              borderRadius="3xl"
              ratio={1}
              backgroundColor="orange.200"
            >
              <VStack space="3" alignItems="center" justifyContent="center">
                <Text fontSize="lg" fontWeight="bold">
                  {location}
                </Text>
                <Text fontSize="3xl" fontWeight="bold">
                  {temperature} ℃
                </Text>

                <Image
                  source={{ uri: icon }}
                  alt={weatherDescription}
                  size="xl"
                />
                <Text fontSize="md" fontWeight="bold">
                  {weatherDescription}
                </Text>
              </VStack>
            </AspectRatio>
          )}
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}
