import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async() => {
      const { data } = await api.get('repositories');
      setRepositories(data);
    })();
  }, []);

  async function handleLikeRepository(id) {
    const { data: { likes } } = await api.post(`/repositories/${id}/like`);
    setRepositories(repos => repos.map(repo => {
      if (repo.id === id) repo.likes = likes;

      return repo;
    }))
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B0A0D" />
      
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={({ id }) => id}
          renderItem={({ item: repository }) => (
            <View style={styles.repository}>
              <Text style={styles.repositoryTitle}>{repository.title}</Text>

              <View style={styles.repositoryTechs}>
                {repository.techs.toString().split(',').map((tech, index) => (
                  <Text style={styles.repositoryTechsText} key={index}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.repositoryLikes}>
                <Text
                  style={styles.repositoryLikesText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} {repository.likes > 1 ? 'curtidas' : 'curtida'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.repositoryButton}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.repositoryButtonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )} 
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B0A0D",
    flex: 1,
    paddingBottom: 16,
    paddingTop: 16,
  },

  repository: {
    backgroundColor: "#202024",
    borderRadius: 4,
    marginBottom: 16,
    marginHorizontal: 15,
    padding: 20,
  },

  repositoryTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: "bold",
  },

  repositoryTechs: {
    flexDirection: "row",
    marginTop: 8,
  },

  repositoryTechsText: {
    backgroundColor: "#04d361",
    borderRadius: 2,
    color: "#202024",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  repositoryLikes: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },

  repositoryLikesText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    opacity: .8,
  },

  repositoryButton: {
    marginTop: 10,
  },

  repositoryButtonText: {
    backgroundColor: "#ED3F5F",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    padding: 15,
    textAlign: 'center',
  },
});
