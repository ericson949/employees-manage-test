import * as request from 'supertest';
import {
  IWebinaireRepository,
  I_WEBINAIRE_REPOSITORY,
} from '../webinaires/ports/webinaire-repository.interface';
import { e2eUsers } from './seeds/user-seeds.e2e';
import { e2eWebinaires } from './seeds/webinaire-seeds.e2e';
import { TestApp } from './utils/test-app';

describe('Feature: canceling the webinaire', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUsers.johnDoe, e2eWebinaires.webinaire1]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: happy path', () => {
    it('should succeed', async () => {
      const id = e2eWebinaires.webinaire1.entity.props.id;

      const result = await request(app.getHttpServer())
        .delete(`/webinaires/${id}`)
        .set('Authorization', e2eUsers.johnDoe.createAuthorizationToken());

      expect(result.status).toBe(200);

      const webinaireRepository = app.get<IWebinaireRepository>(
        I_WEBINAIRE_REPOSITORY,
      );

      const webinaire = await webinaireRepository.findById(id);
      expect(webinaire).toBeNull();
    });
  });

  describe('Scenario: the user is not authenticated', () => {
    it('should reject', async () => {
      const id = e2eWebinaires.webinaire1.entity.props.id;

      const result = await request(app.getHttpServer()).delete(
        `/webinaires/${id}`,
      );

      expect(result.status).toBe(403);
    });
  });
});
